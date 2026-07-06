import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Calendar, 
  Eye, 
  ArrowRight,
  Search,
  Tag
} from "lucide-react";

import news1Image from "@/assets/news/news-1.jpg";
import news2Image from "@/assets/news/news-2.jpg";
import news3Image from "@/assets/news/news-3.jpg";

const categories = [
  { id: "all", name: "Все", count: 24 },
  { id: "news", name: "Новинки", count: 8 },
  { id: "promo", name: "Акции", count: 6 },
  { id: "company", name: "Компания", count: 5 },
  { id: "tips", name: "Советы", count: 5 },
];

const newsData = [
  {
    id: 1,
    slug: "novaya-linejka-pritsepov-skif-2025",
    title: "Новая линейка прицепов СКИФ-2025",
    excerpt: "Представляем обновлённую линейку легковых прицепов с улучшенной конструкцией рамы, новой светотехникой и расширенной комплектацией. Модели доступны к заказу уже сейчас.",
    content: "",
    date: "15 января 2025",
    category: "Новинки",
    categoryId: "news",
    image: news1Image,
    views: 1250,
    featured: true,
  },
  {
    id: 2,
    slug: "vesennyaya-rasprodazha-skidki-do-20",
    title: "Весенняя распродажа — скидки до 20%",
    excerpt: "С 1 марта стартует ежегодная весенняя акция. Скидки на популярные модели прицепов, аксессуары и услуги по ремонту. Успейте воспользоваться выгодным предложением!",
    content: "",
    date: "10 января 2025",
    category: "Акции",
    categoryId: "promo",
    image: news2Image,
    views: 2340,
    featured: false,
  },
  {
    id: 3,
    slug: "otkrytie-novogo-servisnogo-centra",
    title: "Открытие нового сервисного центра в Казани",
    excerpt: "Рады сообщить об открытии нового пункта обслуживания в Казани. Теперь качественный ремонт и обслуживание прицепов доступны ещё большему числу клиентов.",
    content: "",
    date: "5 января 2025",
    category: "Компания",
    categoryId: "company",
    image: news3Image,
    views: 890,
    featured: false,
  },
  {
    id: 4,
    slug: "novye-pritsepy-dlya-lodok-sputnik-aqua",
    title: "Новые прицепы для лодок Спутник AQUA",
    excerpt: "В наличии появились новые модели прицепов для лодок серии AQUA от завода «Спутник» с телескопическими фонарями и раздвижным дышлом.",
    content: "",
    date: "28 декабря 2024",
    category: "Новинки",
    categoryId: "news",
    image: news1Image,
    views: 1560,
    featured: false,
  },
  {
    id: 5,
    slug: "kak-vybrat-pritsep-dlya-lodki",
    title: "Как выбрать прицеп для лодки: советы экспертов",
    excerpt: "Подробное руководство по выбору прицепа для транспортировки лодки. Разбираем основные характеристики и на что обращать внимание при покупке.",
    content: "",
    date: "20 декабря 2024",
    category: "Советы",
    categoryId: "tips",
    image: news2Image,
    views: 3200,
    featured: false,
  },
  {
    id: 6,
    slug: "novogodnyaya-akciya-podarki-dlya-klientov",
    title: "Новогодняя акция: подарки для клиентов",
    excerpt: "При покупке любого прицепа до 31 декабря вы получаете в подарок набор аксессуаров: противооткатные упоры, стяжные ремни и защитный чехол.",
    content: "",
    date: "15 декабря 2024",
    category: "Акции",
    categoryId: "promo",
    image: news3Image,
    views: 1890,
    featured: false,
  },
];

const News = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredNews = newsData.filter((item) => {
    const matchesCategory = activeCategory === "all" || item.categoryId === activeCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredNews = filteredNews.find((item) => item.featured);
  const regularNews = filteredNews.filter((item) => !item.featured);

  return (
    <div className="min-h-screen">
      <Header />
      
      <main>
        {/* Hero */}
        <section className="relative py-16 md:py-24 gradient-primary overflow-hidden">
          <div className="absolute inset-0 bg-[url('/placeholder.svg')] opacity-5 bg-repeat" />
          <div className="container relative z-10">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-primary-foreground/70 text-sm mb-8">
              <Link to="/" className="hover:text-primary-foreground transition-colors">Главная</Link>
              <span>/</span>
              <span className="text-primary-foreground">Новости</span>
            </nav>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black text-primary-foreground mb-6">
              Новости компании
            </h1>
            <p className="text-xl text-primary-foreground/80 max-w-2xl">
              Актуальные новости, обзоры новинок, акции и полезные советы 
              от экспертов компании СКИФ
            </p>
          </div>
        </section>

        {/* Filter & Search */}
        <section className="py-8 border-b border-border bg-card sticky top-[65px] md:top-[105px] z-40">
          <div className="container">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              {/* Categories */}
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <Button
                    key={cat.id}
                    variant={activeCategory === cat.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setActiveCategory(cat.id)}
                    className={`font-medium ${activeCategory === cat.id ? 'gradient-primary text-primary-foreground' : ''}`}
                  >
                    {cat.name}
                    <span className="ml-1.5 text-xs opacity-70">({cat.count})</span>
                  </Button>
                ))}
              </div>

              {/* Search */}
              <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Поиск новостей..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>
        </section>

        {/* News List */}
        <section className="py-12 md:py-16">
          <div className="container">
            {/* Featured article */}
            {featuredNews && (
              <Link to={`/news/${featuredNews.slug}`} className="block">
                <Card className="mb-8 group overflow-hidden hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-0">
                    <div className="grid md:grid-cols-2">
                      <div className="aspect-video md:aspect-auto overflow-hidden">
                        <img 
                          src={featuredNews.image} 
                          alt={featuredNews.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-6 md:p-8 lg:p-10 flex flex-col justify-center">
                        <Badge className="w-fit mb-4 gradient-accent text-accent-foreground">
                          {featuredNews.category}
                        </Badge>
                        <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                          {featuredNews.title}
                        </h2>
                        <p className="text-muted-foreground mb-6 leading-relaxed">
                          {featuredNews.excerpt}
                        </p>
                        <div className="flex items-center justify-between mt-auto">
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {featuredNews.date}
                            </span>
                            <span className="flex items-center gap-1">
                              <Eye className="h-4 w-4" />
                              {featuredNews.views}
                            </span>
                          </div>
                          <span className="text-primary font-semibold inline-flex items-center gap-1">
                            Читать далее
                            <ArrowRight className="h-4 w-4" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )}

            {/* News grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularNews.map((item, index) => (
                <Link 
                  key={item.id}
                  to={`/news/${item.slug}`}
                  className="block"
                >
                  <Card 
                    className="group overflow-hidden hover:shadow-xl transition-all duration-300 animate-fade-in h-full"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <CardContent className="p-0">
                      <div className="aspect-video overflow-hidden">
                        <img 
                          src={item.image} 
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-6">
                        <Badge variant="outline" className="mb-3 text-xs">
                          <Tag className="h-3 w-3 mr-1" />
                          {item.category}
                        </Badge>
                        <h3 className="text-lg font-heading font-bold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                          {item.excerpt}
                        </p>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <div className="flex items-center gap-3">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {item.date}
                            </span>
                            <span className="flex items-center gap-1">
                              <Eye className="h-3 w-3" />
                              {item.views}
                            </span>
                          </div>
                          <span className="text-primary font-medium">
                            Читать
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            {filteredNews.length === 0 && (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg">
                  По вашему запросу ничего не найдено
                </p>
              </div>
            )}

            {/* Pagination placeholder */}
            {filteredNews.length > 6 && (
              <div className="flex justify-center mt-12">
                <Button variant="outline" size="lg" className="font-semibold">
                  Загрузить ещё
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default News;
