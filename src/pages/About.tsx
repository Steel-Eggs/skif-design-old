import React from "react";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Award,
  Users,
  Calendar,
  MapPin,
  Shield,
  Truck,
  Wrench,
  Star,
  Phone,
  ArrowRight,
  CheckCircle2,
  Building2,
  Heart,
  ThumbsUp,
  Clock
} from "lucide-react";

import mzsaLogo from "@/assets/partners/mzsa.png";
import sstLogo from "@/assets/partners/sst.png";
import kurganLogo from "@/assets/partners/kurganskie.png";
import sputnikLogo from "@/assets/partners/sputnik.png";
import vektorLogo from "@/assets/partners/vektor-new.png";
import ekspediciaLogo from "@/assets/partners/ekspedicia.png";
import bagemLogo from "@/assets/partners/bagem.png";
import clubCardImage from "@/assets/club-card.png";
const milestones = [
  { year: "2004", title: "Основание компании", description: "Начало деятельности в Санкт-Петербурге" },
  { year: "2008", title: "Открытие сервиса", description: "Запуск собственного сервисного центра" },
  { year: "2012", title: "Расширение сети", description: "Открытие второй точки продаж" },
  { year: "2016", title: "СКИФ-Клуб", description: "Запуск программы лояльности для клиентов" },
  { year: "2020", title: "Цифровизация", description: "Переход на онлайн-продажи и консультации" },
  { year: "2024", title: "20 лет на рынке", description: "Юбилей компании и более 50 000 клиентов" },
];

const advantages = [
  {
    icon: Award,
    title: "Официальный дилер",
    description: "Являемся официальным представителем ведущих российских производителей прицепов"
  },
  {
    icon: Truck,
    title: "Широкий ассортимент",
    description: "Самый большой выбор прицепов в Санкт-Петербурге — более 200 моделей в наличии"
  },
  {
    icon: Shield,
    title: "Гарантия качества",
    description: "Официальная гарантия производителя и собственный гарантийный сервис"
  },
  {
    icon: Wrench,
    title: "Сервисное обслуживание",
    description: "Полный комплекс услуг по обслуживанию и ремонту прицепов любой сложности"
  },
  {
    icon: Heart,
    title: "СКИФ-Клуб",
    description: "Бесплатное пожизненное техническое обслуживание для наших клиентов"
  },
  {
    icon: ThumbsUp,
    title: "Trade-In",
    description: "Выгодный обмен старого прицепа на новый с доплатой или без"
  }
];

const stats = [
  { value: "20+", label: "лет на рынке" },
  { value: "50 000+", label: "довольных клиентов" },
  { value: "200+", label: "моделей в наличии" },
  { value: "10+", label: "производителей" },
];

const About = () => {
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
              <span className="text-primary-foreground">О компании</span>
            </nav>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge className="mb-6 gradient-accent text-accent-foreground text-sm px-4 py-2">
                  <Calendar className="w-4 h-4 mr-2" />
                  С 2004 года на рынке
                </Badge>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black text-primary-foreground mb-6">
                  О компании СКИФ
                </h1>
                <p className="text-xl text-primary-foreground/80 mb-8 leading-relaxed">
                  Компания «СКИФ» — один из крупнейших продавцов автомобильных прицепов в Санкт-Петербурге 
                  и Ленинградской области. Более 20 лет мы помогаем нашим клиентам выбрать надёжные 
                  решения для перевозки грузов.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link to="/catalog">
                    <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-bold">
                      Каталог прицепов
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link to="/contacts">
                    <Button size="lg" variant="outline" className="font-bold border-white text-white bg-white/10 hover:bg-white hover:text-primary">
                      Контакты
                    </Button>
                  </Link>
                </div>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat) => (
                  <Card key={stat.label} className="bg-white/10 backdrop-blur border-white/20">
                    <CardContent className="p-6 text-center">
                      <div className="text-4xl md:text-5xl font-black text-white mb-2">
                        {stat.value}
                      </div>
                      <div className="text-primary-foreground/80 font-medium">
                        {stat.label}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>


        {/* Mission Section */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <Badge className="mb-6">Наша миссия</Badge>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6">
                Мы делаем перевозку грузов удобной и доступной
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Наша цель — предоставить каждому клиенту качественный прицеп, который будет 
                служить годами. Мы тщательно отбираем производителей и модели, чтобы предложить 
                вам только лучшие решения по оптимальным ценам. От консультации до послепродажного 
                обслуживания — мы сопровождаем вас на каждом этапе.
              </p>
            </div>

            {/* Advantages Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {advantages.map((advantage, index) => {
                const Icon = advantage.icon;
                return (
                  <Card 
                    key={advantage.title}
                    className="group hover:shadow-xl transition-all duration-300 animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CardContent className="p-6">
                      <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <Icon className="h-7 w-7 text-primary-foreground" />
                      </div>
                      <h3 className="text-lg font-bold text-foreground mb-2">
                        {advantage.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {advantage.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-16 md:py-24 bg-muted/50">
          <div className="container">
            <div className="text-center mb-12">
              <Badge className="mb-4">История компании</Badge>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
                Наш путь развития
              </h2>
            </div>

            <div className="relative max-w-4xl mx-auto">
              {/* Timeline line */}
              <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-border transform -translate-x-1/2 hidden md:block" />
              
              <div className="space-y-8">
                {milestones.map((milestone, index) => (
                  <div 
                    key={milestone.year}
                    className={`flex items-center gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                  >
                    <Card className={`flex-1 animate-fade-in ${index % 2 === 0 ? 'md:text-right' : ''}`}>
                      <CardContent className="p-6">
                        <div className="text-3xl font-black text-primary mb-2">{milestone.year}</div>
                        <h3 className="text-lg font-bold text-foreground mb-1">{milestone.title}</h3>
                        <p className="text-muted-foreground text-sm">{milestone.description}</p>
                      </CardContent>
                    </Card>
                    <div className="hidden md:flex w-4 h-4 rounded-full gradient-primary shrink-0 relative z-10" />
                    <div className="flex-1 hidden md:block" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Partners */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="text-center mb-12">
              <Badge className="mb-4">Партнёры</Badge>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
                Официальный дилер производителей
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Мы работаем напрямую с ведущими заводами-производителями прицепов России
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4">
              {[
                { logo: mzsaLogo, name: "МЗСА" },
                { logo: sstLogo, name: "ССТ" },
                { logo: kurganLogo, name: "Курганские прицепы" },
                { logo: sputnikLogo, name: "Спутник" },
                { logo: vektorLogo, name: "Вектор" },
                { logo: ekspediciaLogo, name: "Экспедиция" },
                { logo: bagemLogo, name: "Багем" }
              ].map((partner) => (
                <Card key={partner.name} className="hover:shadow-lg transition-all">
                  <CardContent className="p-6 flex items-center justify-center h-24">
                    <img 
                      src={partner.logo} 
                      alt={partner.name}
                      className="h-14 md:h-16 object-contain grayscale hover:grayscale-0 transition-all"
                    />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container">
            <div className="text-center mb-12">
              <Badge className="mb-4">
                <Star className="w-4 h-4 mr-1" />
                Отзывы
              </Badge>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
                Что говорят наши клиенты
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Более 500 положительных отзывов на Яндекс.Картах — лучшее подтверждение качества нашей работы
              </p>
            </div>

            <div className="flex justify-center">
              <div className="relative w-full max-w-2xl" style={{ height: '700px' }}>
                <iframe 
                  className="w-full h-full border border-border rounded-2xl shadow-card"
                  src="https://yandex.ru/maps-reviews-widget/183604077331?comments"
                  title="Отзывы о компании СКИФ на Яндекс.Картах"
                />
                <a 
                  href="https://yandex.ru/maps/org/skif/183604077331/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-2 left-0 w-full text-center text-[10px] text-muted-foreground/60 font-sans px-4 truncate"
                >
                  Скиф на карте Санкт‑Петербурга — Яндекс Карты
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* СКИФ-Клуб Section */}
        <section className="py-16 md:py-24 gradient-secondary">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge className="mb-6 bg-white text-secondary">
                  <Heart className="w-4 h-4 mr-2" />
                  Эксклюзивное предложение
                </Badge>
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-secondary-foreground mb-6">
                  Программа СКИФ-Клуб
                </h2>
                <p className="text-secondary-foreground/80 text-lg mb-8 leading-relaxed">
                  Покупая прицеп в компании «СКИФ», вы автоматически становитесь участником программы 
                  СКИФ-Клуб и получаете бесплатное пожизненное техническое обслуживание вашего прицепа.
                </p>
                <ul className="space-y-4 mb-8">
                  {[
                    "Бесплатная диагностика и регулировка",
                    "Скидки на запчасти и аксессуары",
                    "Приоритетное обслуживание",
                    "Специальные предложения для участников"
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-secondary-foreground">
                      <CheckCircle2 className="h-5 w-5 text-accent shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/catalog">
                  <Button size="lg" className="bg-white text-secondary hover:bg-white/90 font-bold">
                    Выбрать прицеп
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
              
              <div className="flex items-center justify-center">
                <img 
                  src={clubCardImage} 
                  alt="Клубная карта СКИФ-Клуб - 5% скидка навсегда"
                  className="max-w-md w-full rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
          </div>
        </section>

        {/* SEO Text Section - moved to bottom */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <Badge className="mb-6">О компании</Badge>
              <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
                <p className="text-lg leading-relaxed">
                  Компания «СКИФ» основана в январе 2004 года. Основным видом деятельности является продажа и прокат 
                  высококачественных легковых прицепов различного назначения, как новых, так и бывших в употреблении, 
                  реализация и установка фаркопов для всех моделей автомобилей и полное техническое обслуживание прицепной техники.
                </p>
                <p className="text-lg leading-relaxed">
                  ООО «СКИФ» является официальным торговым представителем большинства ведущих производителей России. 
                  Сотрудничество с обширным рядом заводов-производителей позволяет нам обеспечивать самый широкий ценовой 
                  диапазон на рынках Санкт-Петербурга и Ленинградской области.
                </p>
                <p className="text-lg leading-relaxed">
                  Внушительный модельный ряд прицепов и более тысячи наименований аксессуаров и запчастей позволяет нам 
                  удовлетворить любые потребности наших клиентов. Среди нашей продукции представлены прицепы для общих грузов, 
                  строительных материалов, мототехники, лодок и катеров, а также автовозы и торговые прицепы собственной марки.
                </p>
                <p className="text-lg leading-relaxed">
                  Наши опытные менеджеры придерживаются высоких стандартов обслуживания клиентов. Вы гарантированно получите 
                  полную и технически грамотную консультацию по каждому интересующему продукту, получите ответы на любые вопросы, 
                  связанные с легковыми автоприцепами, вне зависимости от того, являетесь ли Вы нашим клиентом или нет.
                </p>
                <p className="text-lg leading-relaxed">
                  Удобство расчетов обеспечивается различными способами оплаты: наличный и безналичный расчет (по карте или по счету 
                  от организации), банковское кредитование на сумму до 300 т.р., программа Трейд-Ин и регулярные акции на прицепы 
                  старше одного года.
                </p>
                <p className="text-lg leading-relaxed">
                  С 2015 года в компании запущена программа «СКИФ-клуб», которая позволяет каждому нашему клиенту получать бесплатное 
                  техническое обслуживание прицепа на протяжении всего срока его эксплуатации, участвовать в акциях и приобретать 
                  запчасти и аксессуары с гарантированной скидкой.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container">
            <Card className="gradient-primary border-0 overflow-hidden">
              <CardContent className="p-8 md:p-12 text-center">
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-foreground mb-6">
                  Остались вопросы?
                </h2>
                <p className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
                  Свяжитесь с нами, и наши специалисты ответят на все ваши вопросы
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-bold">
                    Заказать звонок
                  </Button>
                  <a href="tel:+78002001636">
                    <Button 
                      size="lg" 
                      variant="outline" 
                      className="font-bold border-white text-white bg-white/10 hover:bg-white hover:text-primary"
                    >
                      <Phone className="mr-2 h-5 w-5" />
                      +7 (800) 200-16-36
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
