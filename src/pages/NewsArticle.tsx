import React from "react";
import { Link, useParams } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  Eye, 
  ArrowLeft,
  ArrowRight,
  Share2,
  Tag,
  ChevronRight
} from "lucide-react";

import news1Image from "@/assets/news/news-1.jpg";
import news2Image from "@/assets/news/news-2.jpg";
import news3Image from "@/assets/news/news-3.jpg";

// Full news data (in real app this would come from API/CMS)
const newsData: Record<string, {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: string;
  image: string;
  views: number;
}> = {
  "novye-pritsepy-dlya-lodok-sputnik-aqua": {
    id: 4,
    slug: "novye-pritsepy-dlya-lodok-sputnik-aqua",
    title: "Новые прицепы для лодок Спутник AQUA",
    excerpt: "В наличии появились новые модели прицепов для лодок серии AQUA от завода «Спутник».",
    content: `
      <p>Рады сообщить о поступлении новых моделей прицепов для лодок серии <strong>AQUA</strong> от завода «Спутник». Эта серия разработана специально для безопасной и удобной транспортировки лодок и катеров различных размеров.</p>

      <h2>Ключевые особенности серии AQUA</h2>

      <p>Прицепы серии AQUA обладают рядом конструктивных преимуществ, которые выделяют их среди конкурентов:</p>

      <ul>
        <li><strong>Телескопические фонари (+22 см)</strong> — позволяют погружать прицеп глубже в воду при спуске и подъёме лодки, не рискуя повредить электрику</li>
        <li><strong>Раздвижное дышло (+42 см)</strong> — увеличивает общую длину прицепа для перевозки лодок с удлинённым носом</li>
        <li><strong>4-листовые прогрессивные рессоры</strong> — обеспечивают плавный ход даже при полной загрузке</li>
        <li><strong>Оцинкованная рама</strong> — защита от коррозии при постоянном контакте с водой</li>
      </ul>

      <h2>Модельный ряд</h2>

      <p>В наличии представлены следующие модели серии AQUA:</p>

      <ul>
        <li><strong>Спутник AQUA 40</strong> — для лодок до 4 метров, грузоподъёмность 450 кг</li>
        <li><strong>Спутник AQUA 45</strong> — для лодок до 4,5 метров, грузоподъёмность 550 кг</li>
        <li><strong>Спутник AQUA 55</strong> — для лодок до 5,5 метров, грузоподъёмность 650 кг</li>
        <li><strong>Спутник AQUA 60</strong> — для лодок до 6 метров, грузоподъёмность 750 кг</li>
      </ul>

      <h2>Цены и наличие</h2>

      <p>Все модели доступны для заказа и покупки прямо сейчас. Мы предлагаем конкурентные цены и возможность приобретения в кредит или рассрочку.</p>

      <p>Для получения подробной консультации и оформления заказа обращайтесь к нашим специалистам по телефону <a href="tel:+78002001636">+7 (800) 200-16-36</a> или посетите наш салон.</p>
    `,
    date: "28 июня 2022",
    category: "Новинки",
    image: news1Image,
    views: 1560,
  },
  "novaya-linejka-pritsepov-skif-2025": {
    id: 1,
    slug: "novaya-linejka-pritsepov-skif-2025",
    title: "Новая линейка прицепов СКИФ-2025",
    excerpt: "Представляем обновлённую линейку легковых прицепов с улучшенной конструкцией рамы.",
    content: `
      <p>С радостью представляем вам полностью обновлённую линейку легковых прицепов <strong>СКИФ-2025</strong>. Наши инженеры учли все пожелания клиентов и разработали модели, которые сочетают в себе надёжность, функциональность и современный дизайн.</p>

      <h2>Что нового в линейке 2025 года</h2>

      <ul>
        <li><strong>Усиленная рама</strong> — новая конструкция с дополнительными рёбрами жёсткости</li>
        <li><strong>LED-светотехника</strong> — современные энергоэффективные фонари</li>
        <li><strong>Расширенная комплектация</strong> — больше полезных аксессуаров в базе</li>
        <li><strong>Увеличенный клиренс</strong> — лучшая проходимость на неровных дорогах</li>
      </ul>

      <p>Модели уже доступны к заказу. Приезжайте в наш салон, чтобы увидеть новинки вживую!</p>
    `,
    date: "15 января 2025",
    category: "Новинки",
    image: news1Image,
    views: 1250,
  },
  "vesennyaya-rasprodazha-skidki-do-20": {
    id: 2,
    slug: "vesennyaya-rasprodazha-skidki-do-20",
    title: "Весенняя распродажа — скидки до 20%",
    excerpt: "С 1 марта стартует ежегодная весенняя акция со скидками до 20%.",
    content: `
      <p>Ежегодная весенняя распродажа уже скоро! С <strong>1 марта</strong> мы предлагаем скидки до 20% на популярные модели прицепов, аксессуары и услуги по ремонту.</p>

      <h2>Что входит в акцию</h2>

      <ul>
        <li>Скидка 20% на прицепы прошлых сезонов</li>
        <li>Скидка 15% на аксессуары и запчасти</li>
        <li>Скидка 10% на услуги сервиса</li>
        <li>Бесплатная доставка при заказе от 100 000 ₽</li>
      </ul>

      <p>Акция действует до 31 марта. Успейте воспользоваться выгодным предложением!</p>
    `,
    date: "10 января 2025",
    category: "Акции",
    image: news2Image,
    views: 2340,
  },
};

const relatedNews = [
  {
    id: 1,
    slug: "novaya-linejka-pritsepov-skif-2025",
    title: "Новая линейка прицепов СКИФ-2025",
    date: "15 января 2025",
    image: news1Image,
  },
  {
    id: 2,
    slug: "vesennyaya-rasprodazha-skidki-do-20",
    title: "Весенняя распродажа — скидки до 20%",
    date: "10 января 2025",
    image: news2Image,
  },
  {
    id: 3,
    slug: "otkrytie-novogo-servisnogo-centra",
    title: "Открытие нового сервисного центра",
    date: "5 января 2025",
    image: news3Image,
  },
];

const NewsArticle = () => {
  const { slug } = useParams<{ slug: string }>();
  
  const article = slug ? newsData[slug] : null;

  if (!article) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="py-24">
          <div className="container text-center">
            <h1 className="text-4xl font-bold text-foreground mb-4">Новость не найдена</h1>
            <p className="text-muted-foreground mb-8">Запрашиваемая страница не существует</p>
            <Link to="/news">
              <Button>Вернуться к новостям</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      <main>
        {/* Hero */}
        <section className="relative py-12 md:py-20 gradient-primary overflow-hidden">
          <div className="absolute inset-0 bg-[url('/placeholder.svg')] opacity-5 bg-repeat" />
          <div className="container relative z-10">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-primary-foreground/70 text-sm mb-8 flex-wrap">
              <Link to="/" className="hover:text-primary-foreground transition-colors">Главная</Link>
              <ChevronRight className="h-4 w-4" />
              <Link to="/news" className="hover:text-primary-foreground transition-colors">Новости</Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-primary-foreground line-clamp-1">{article.title}</span>
            </nav>

            <Badge className="mb-4 gradient-accent text-accent-foreground">
              <Tag className="h-4 w-4 mr-1" />
              {article.category}
            </Badge>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-black text-primary-foreground mb-6 max-w-4xl">
              {article.title}
            </h1>
            
            <div className="flex items-center gap-6 text-primary-foreground/80">
              <span className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                {article.date}
              </span>
              <span className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                {article.views} просмотров
              </span>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-12 md:py-16">
          <div className="container">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Main content */}
              <article className="lg:col-span-2">
                <Card className="overflow-hidden mb-8">
                  <img 
                    src={article.image} 
                    alt={article.title}
                    className="w-full aspect-video object-cover"
                  />
                </Card>

                <div 
                  className="prose prose-lg max-w-none
                    prose-headings:font-heading prose-headings:font-bold prose-headings:text-foreground
                    prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
                    prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-4
                    prose-ul:my-4 prose-ul:pl-6
                    prose-li:text-muted-foreground prose-li:mb-2
                    prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                    prose-strong:text-foreground"
                  dangerouslySetInnerHTML={{ __html: article.content }}
                />

                {/* Share */}
                <div className="flex items-center gap-4 mt-12 pt-8 border-t border-border">
                  <span className="text-muted-foreground font-medium">Поделиться:</span>
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4 mr-2" />
                    Telegram
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4 mr-2" />
                    VK
                  </Button>
                </div>

                {/* Navigation */}
                <div className="flex justify-between items-center mt-8 pt-8 border-t border-border">
                  <Link to="/news">
                    <Button variant="outline">
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Все новости
                    </Button>
                  </Link>
                </div>
              </article>

              {/* Sidebar */}
              <aside className="lg:col-span-1">
                <div className="sticky top-32">
                  <h3 className="text-lg font-bold text-foreground mb-6">
                    Другие новости
                  </h3>
                  <div className="space-y-4">
                    {relatedNews.filter(n => n.slug !== slug).slice(0, 3).map((item) => (
                      <Card key={item.id} className="group hover:shadow-lg transition-all">
                        <CardContent className="p-4">
                          <div className="flex gap-4">
                            <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0">
                              <img 
                                src={item.image} 
                                alt={item.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-bold text-foreground text-sm line-clamp-2 group-hover:text-primary transition-colors mb-2">
                                <Link to={`/news/${item.slug}`}>
                                  {item.title}
                                </Link>
                              </h4>
                              <span className="text-xs text-muted-foreground">
                                {item.date}
                              </span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <Link to="/news" className="block mt-6">
                    <Button variant="outline" className="w-full">
                      Все новости
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>

                  {/* CTA Card */}
                  <Card className="mt-8 gradient-primary border-0">
                    <CardContent className="p-6 text-center">
                      <h3 className="text-lg font-bold text-primary-foreground mb-3">
                        Нужна консультация?
                      </h3>
                      <p className="text-primary-foreground/80 text-sm mb-4">
                        Наши специалисты ответят на все вопросы
                      </p>
                      <Button className="w-full bg-white text-primary hover:bg-white/90 font-bold">
                        Заказать звонок
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default NewsArticle;
