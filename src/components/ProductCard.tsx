import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Heart, Flame, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useFavorites, FAVORITES_UPDATED_EVENT, dispatchFavoritesUpdate } from "@/hooks/useFavorites";
import { useCart, dispatchCartUpdate } from "@/hooks/useCart";
import MarketingBadge from "@/components/MarketingBadge";
// Import product images
import trailer1 from "@/assets/products/trailer-1.jpg";
import trailer2 from "@/assets/products/trailer-2.jpg";
import trailer3 from "@/assets/products/trailer-3.jpg";
import trailerUserHorizontal from "@/assets/products/trailer-user-horizontal.jpg";
import trailerUserVertical from "@/assets/products/trailer-user-vertical-collage.jpg";

// Image pool for products
const productImages = [trailer1, trailer2, trailer3, trailerUserHorizontal, trailerUserVertical];

export interface Product {
  id: number;
  name: string;
  category?: string;
  brand?: string;
  price: number;
  oldPrice?: number | null;
  image?: string;
  rating?: number;
  reviews?: number;
  isHit?: boolean;
  isNew?: boolean;
  inStock?: boolean;
}

interface ProductCardProps {
  product: Product;
  index?: number;
  viewMode?: 'grid' | 'list';
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("ru-RU").format(price);
};

export const getProductImage = (productId: number): string => {
  return productImages[productId % productImages.length];
};

const ProductCard = ({ product, index = 0, viewMode = 'grid' }: ProductCardProps) => {
  const [addedToCart, setAddedToCart] = useState(false);
  const { isFavorite, toggleFavorite } = useFavorites();
  const { addToCart } = useCart();
  const [isInFavorites, setIsInFavorites] = useState(false);
  
  useEffect(() => {
    setIsInFavorites(isFavorite(product.id));
  }, [isFavorite, product.id]);

  // Listen for favorites updates from other components
  useEffect(() => {
    const handleUpdate = () => {
      setIsInFavorites(isFavorite(product.id));
    };
    window.addEventListener(FAVORITES_UPDATED_EVENT, handleUpdate);
    return () => window.removeEventListener(FAVORITES_UPDATED_EVENT, handleUpdate);
  }, [isFavorite, product.id]);
  
  const discountPercent = product.oldPrice 
    ? Math.round((1 - product.price / product.oldPrice) * 100) 
    : 0;
  const savings = product.oldPrice ? product.oldPrice - product.price : 0;
  const productImage = product.image && product.image !== "/placeholder.svg" ? product.image : getProductImage(product.id);
  const inStock = product.inStock !== false;
  const isHit = product.isHit ?? product.id % 3 === 0;
  const isNew = product.isNew ?? product.id % 4 === 1;
  const category = product.category ?? product.brand ?? "Прицепы";

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: productImage,
    });
    dispatchCartUpdate();
    
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 1500);
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(product.id);
    setIsInFavorites(!isInFavorites);
    dispatchFavoritesUpdate();
  };

  if (viewMode === 'list') {
    return (
      <Card 
        className="group overflow-hidden hover:shadow-xl transition-all duration-300 animate-fade-in"
        style={{ animationDelay: `${Math.min(index, 7) * 0.05}s` }}
      >
        <CardContent className="p-0 flex flex-col sm:flex-row">
          {/* Image */}
          <div className="relative w-full sm:w-48 md:w-64 aspect-[4/3] sm:aspect-auto sm:h-auto bg-muted overflow-hidden shrink-0">
            <img 
              src={productImage} 
              alt={product.name}
              className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-500"
            />
            
            {/* Badges */}
            <div className="absolute top-2 left-2 flex flex-col gap-1">
              {isHit && (
                <Badge className="gradient-accent text-accent-foreground font-bold text-xs">
                  <Flame className="h-3 w-3 mr-1" />
                  Хит
                </Badge>
              )}
              {isNew && (
                <Badge className="gradient-secondary text-secondary-foreground font-bold text-xs">
                  Новинка
                </Badge>
              )}
              {product.oldPrice && (
                <Badge variant="destructive" className="font-bold text-xs">
                  -{discountPercent}%
                </Badge>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 p-4 flex flex-col justify-center min-w-0">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              {category}
            </span>
            
            <h3 className="font-heading font-bold text-foreground mt-1 mb-2 group-hover:text-primary transition-colors line-clamp-2">
              <Link to={`/product/${product.id}`}>
                {product.name}
              </Link>
          </h3>
          
          <div className="mb-3">
            <MarketingBadge productId={product.id} />
          </div>

          
            <div className="mb-2">
              <MarketingBadge productId={product.id} />
            </div>

            <div className="flex items-baseline gap-2 mb-2 flex-wrap">
              <span className="text-xl font-heading font-bold text-foreground">
                {formatPrice(product.price)} ₽
              </span>
              {product.oldPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  {formatPrice(product.oldPrice)} ₽
                </span>
              )}
            </div>

            {product.oldPrice && (
              <span className="text-xs text-destructive font-medium mb-2">
                Выгода {formatPrice(savings)} ₽
              </span>
            )}
            
            <div className="flex items-center gap-2 mt-auto">
              <Button 
                size="sm"
                className={`font-semibold transition-all duration-300 ${
                  addedToCart 
                    ? 'bg-secondary text-secondary-foreground scale-95' 
                    : 'gradient-primary hover:opacity-90'
                }`}
                onClick={handleAddToCart}
              >
                {addedToCart ? (
                  <>
                    <Check className="h-4 w-4 animate-bounce" />
                    Добавлено!
                  </>
                ) : (
                  <>
                    <ShoppingCart className="h-4 w-4" />
                    В корзину
                  </>
                )}
              </Button>
              <span className={`text-sm font-medium ${inStock ? 'text-secondary' : 'text-muted-foreground'}`}>
                {inStock ? '✓ В наличии' : 'Под заказ'}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card 
      className="group overflow-hidden hover:shadow-xl transition-all duration-300 animate-fade-in"
      style={{ animationDelay: `${Math.min(index, 7) * 0.05}s` }}
    >
      <CardContent className="p-0">
        {/* Image */}
        <div className="relative aspect-[4/3] bg-muted overflow-hidden">
          <img 
            src={productImage} 
            alt={product.name}
            className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-500"
          />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {isHit && (
              <Badge className="gradient-accent text-accent-foreground font-bold">
                <Flame className="h-3 w-3 mr-1" />
                Хит
              </Badge>
            )}
            {isNew && (
              <Badge className="gradient-secondary text-secondary-foreground font-bold">
                Новинка
              </Badge>
            )}
            {product.oldPrice && (
              <Badge variant="destructive" className="font-bold text-sm">
                -{discountPercent}%
              </Badge>
            )}
          </div>
          
          {/* Wishlist - higher z-index to be above overlay */}
          <button 
            className={`absolute top-3 right-3 w-10 h-10 rounded-full backdrop-blur-sm flex items-center justify-center transition-all duration-300 z-20 ${
              isInFavorites 
                ? 'bg-destructive text-destructive-foreground opacity-100' 
                : 'bg-card/90 opacity-0 group-hover:opacity-100 hover:bg-destructive hover:text-destructive-foreground'
            }`}
            onClick={handleToggleFavorite}
          >
            <Heart className={`h-5 w-5 ${isInFavorites ? 'fill-current' : ''}`} />
          </button>
          
          {/* Quick view overlay - pointer-events-none on container, only button clickable */}
          <div className="absolute inset-0 bg-foreground/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
            <Link to={`/product/${product.id}`} className="pointer-events-auto">
              <Button variant="secondary" className="font-semibold">
                Подробнее
              </Button>
            </Link>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5">
          {/* Category */}
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            {category}
          </span>
          
          {/* Name */}
          <h3 className="font-heading font-bold text-foreground mt-1 mb-2 line-clamp-2 group-hover:text-primary transition-colors text-sm sm:text-base">
            <Link to={`/product/${product.id}`}>
              {product.name}
            </Link>
          </h3>
          
          
          {/* Price section */}
          <div className="mb-3">
            <div className="flex items-baseline gap-2 flex-wrap">
              <span className="text-xl sm:text-2xl font-heading font-bold text-foreground">
                {formatPrice(product.price)} ₽
              </span>
              {product.oldPrice && (
                <span className="text-xs sm:text-sm text-muted-foreground line-through">
                  {formatPrice(product.oldPrice)} ₽
                </span>
              )}
            </div>
            {/* Savings info */}
            {product.oldPrice && (
              <span className="text-xs text-destructive font-medium">
                Выгода {formatPrice(savings)} ₽
              </span>
            )}
          </div>
          
          {/* Actions */}
          <div className="flex items-center gap-3">
            <Button 
              className={`flex-1 font-semibold transition-all duration-300 ${
                addedToCart 
                  ? 'bg-secondary text-secondary-foreground scale-95' 
                  : inStock 
                    ? 'gradient-primary hover:opacity-90' 
                    : ''
              }`}
              disabled={!inStock}
              onClick={handleAddToCart}
            >
              {addedToCart ? (
                <>
                  <Check className="h-5 w-5 animate-bounce" />
                  Добавлено!
                </>
              ) : (
                <>
                  <ShoppingCart className="h-5 w-5" />
                  В корзину
                </>
              )}
            </Button>
          </div>
          
          {/* Stock status */}
          <div className="mt-3">
            {inStock ? (
              <span className="text-sm font-medium text-secondary">✓ В наличии</span>
            ) : (
              <span className="text-sm font-medium text-muted-foreground">Под заказ</span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
