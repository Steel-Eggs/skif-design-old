import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Heart, Flame, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useFavorites, FAVORITES_UPDATED_EVENT, dispatchFavoritesUpdate } from "@/hooks/useFavorites";
import { useCart, dispatchCartUpdate } from "@/hooks/useCart";

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

// Fly to cart animation
export const flyToCart = (sourceImg: HTMLImageElement | null) => {
  if (!sourceImg) return;
  const cartIcon = document.querySelector('[data-cart-icon]') as HTMLElement | null;
  if (!cartIcon) return;

  const srcRect = sourceImg.getBoundingClientRect();
  const dstRect = cartIcon.getBoundingClientRect();

  const clone = sourceImg.cloneNode(true) as HTMLImageElement;
  clone.style.position = 'fixed';
  clone.style.left = srcRect.left + 'px';
  clone.style.top = srcRect.top + 'px';
  clone.style.width = srcRect.width + 'px';
  clone.style.height = srcRect.height + 'px';
  clone.style.objectFit = 'contain';
  clone.style.zIndex = '9999';
  clone.style.pointerEvents = 'none';
  clone.style.borderRadius = '12px';
  clone.style.transition = 'all 700ms cubic-bezier(0.5, -0.3, 0.7, 0.9)';
  clone.style.opacity = '0.95';
  document.body.appendChild(clone);

  // Force reflow
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  clone.offsetWidth;

  const dx = dstRect.left + dstRect.width / 2 - (srcRect.left + srcRect.width / 2);
  const dy = dstRect.top + dstRect.height / 2 - (srcRect.top + srcRect.height / 2);
  clone.style.transform = `translate(${dx}px, ${dy}px) scale(0.1)`;
  clone.style.opacity = '0.3';

  setTimeout(() => {
    clone.remove();
    cartIcon.animate(
      [
        { transform: 'scale(1)' },
        { transform: 'scale(1.3)' },
        { transform: 'scale(1)' },
      ],
      { duration: 400, easing: 'ease-out' }
    );
  }, 700);
};

const ProductCard = ({ product, index = 0, viewMode = 'grid' }: ProductCardProps) => {
  const [addedToCart, setAddedToCart] = useState(false);
  const { isFavorite, toggleFavorite } = useFavorites();
  const { addToCart } = useCart();
  const [isInFavorites, setIsInFavorites] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  
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
    
    flyToCart(imgRef.current);

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
      <Link to={`/product/${product.id}`} className="block">
        <Card 
          className="group overflow-hidden hover:shadow-xl transition-all duration-300 animate-fade-in"
          style={{ animationDelay: `${Math.min(index, 7) * 0.05}s` }}
        >
          <CardContent className="p-0 flex flex-col sm:flex-row">
            {/* Image */}
            <div className="relative w-full sm:w-48 md:w-64 aspect-[4/3] sm:aspect-auto sm:h-auto bg-muted overflow-hidden shrink-0">
              <img 
                ref={imgRef}
                src={productImage} 
                alt={product.name}
                className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-500"
              />
              
              {/* Badges */}
              <div className="absolute top-2 left-2 flex flex-col gap-1.5">
                {isHit && (
                  <Badge className="gradient-accent text-accent-foreground font-bold text-sm px-3 py-1.5">
                    <Flame className="h-4 w-4 mr-1" />
                    Хит
                  </Badge>
                )}
                {isNew && (
                  <Badge className="gradient-secondary text-secondary-foreground font-bold text-sm px-3 py-1.5">
                    Новинка
                  </Badge>
                )}
                {product.oldPrice && (
                  <Badge variant="destructive" className="font-bold text-sm px-3 py-1.5">
                    -{discountPercent}%
                  </Badge>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 p-4 flex flex-col justify-center min-w-0 gap-2">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                {category}
              </span>
              
              <h3 className="font-heading font-bold text-foreground mt-1 mb-2 group-hover:text-primary transition-colors line-clamp-2">
                {product.name}
              </h3>

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
              
              <div className="flex items-center gap-3 mt-2">
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
      </Link>
    );
  }

  return (
    <Link to={`/product/${product.id}`} className="block cursor-pointer">
      <Card 
        className="group overflow-hidden hover:shadow-xl transition-all duration-300 animate-fade-in h-full"
        style={{ animationDelay: `${Math.min(index, 7) * 0.05}s` }}
      >
        <CardContent className="p-0">
          {/* Image */}
          <div className="relative aspect-square xl:aspect-[4/3] bg-muted overflow-hidden">
            <img 
              ref={imgRef}
              src={productImage} 
              alt={product.name}
              className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-500"
            />
            
            {/* Badges */}
            <div className="absolute top-2 left-2 xl:top-3 xl:left-3 flex flex-col gap-1 xl:gap-2 z-10">
              {isHit && (
                <Badge className="gradient-accent text-accent-foreground font-bold text-[10px] xl:text-sm px-1.5 py-0.5 xl:px-3 xl:py-1.5">
                  <Flame className="h-3 w-3 xl:h-4 xl:w-4 mr-0.5 xl:mr-1" />
                  Хит
                </Badge>
              )}
              {isNew && (
                <Badge className="gradient-secondary text-secondary-foreground font-bold text-[10px] xl:text-sm px-1.5 py-0.5 xl:px-3 xl:py-1.5">
                  Новинка
                </Badge>
              )}
              {product.oldPrice && (
                <Badge variant="destructive" className="font-bold text-[10px] xl:text-sm px-1.5 py-0.5 xl:px-3 xl:py-1.5">
                  -{discountPercent}%
                </Badge>
              )}
            </div>

            {/* Wishlist */}
            <button 
              className={`absolute top-2 right-2 xl:top-3 xl:right-3 w-9 h-9 xl:w-10 xl:h-10 rounded-full backdrop-blur-sm flex items-center justify-center transition-all duration-300 z-20 ${
                isInFavorites 
                  ? 'bg-destructive text-destructive-foreground opacity-100' 
                  : 'bg-card/90 opacity-0 group-hover:opacity-100 hover:bg-destructive hover:text-destructive-foreground'
              }`}
              onClick={handleToggleFavorite}
            >
              <Heart className={`h-4 w-4 xl:h-5 xl:w-5 ${isInFavorites ? 'fill-current' : ''}`} />
            </button>
          </div>

          {/* Content */}
          <div className="p-3 xl:p-5 flex flex-col">
            {/* Category text only on xl (3-per-row) */}
            <span className="hidden xl:inline text-xs font-medium text-muted-foreground uppercase tracking-wider">
              {category}
            </span>
            
            <h3 className="font-heading font-bold text-foreground xl:mt-1 mb-2 line-clamp-2 group-hover:text-primary transition-colors text-sm xl:text-base">
              {product.name}
            </h3>
            
            <div className="mb-2 xl:mb-3">
              <div className="flex items-baseline gap-2 flex-wrap">
                <span className="text-lg xl:text-2xl font-heading font-bold text-foreground">
                  {formatPrice(product.price)} ₽
                </span>
                {product.oldPrice && (
                  <span className="text-xs xl:text-sm text-muted-foreground line-through">
                    {formatPrice(product.oldPrice)} ₽
                  </span>
                )}
              </div>
              {product.oldPrice && (
                <span className="text-xs text-destructive font-medium">
                  Выгода {formatPrice(savings)} ₽
                </span>
              )}
            </div>

            {/* Stock pill — above button on small, below button on xl */}
            <div className="order-1 xl:order-3 mb-2 xl:mb-0 xl:mt-3">
              {inStock ? (
                <span className="inline-flex items-center px-2 py-0.5 xl:px-3 xl:py-1.5 rounded-full bg-secondary/10 text-secondary text-[11px] xl:text-base font-semibold">✓ В наличии</span>
              ) : (
                <span className="inline-flex items-center px-2 py-0.5 xl:px-3 xl:py-1.5 rounded-full bg-muted text-muted-foreground text-[11px] xl:text-base font-semibold">Под заказ</span>
              )}
            </div>

            <div className="order-2 flex items-center gap-3 w-full">
              <Button 
                className={`w-full min-w-0 px-2 xl:px-4 font-semibold transition-all duration-300 h-12 xl:h-10 text-base xl:text-sm ${
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
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProductCard;
