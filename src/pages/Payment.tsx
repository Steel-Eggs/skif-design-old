import React from "react";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Banknote, 
  CreditCard, 
  QrCode, 
  Building2,
  Landmark,
  Phone,
  CheckCircle2,
  Truck,
  FileText,
  Users,
  AlertCircle
} from "lucide-react";

const paymentMethods = [
  {
    icon: Banknote,
    title: "Наличный расчёт",
    description: "Оплата наличными в любой точке продаж «СКИФ» или представителю службы доставки при получении товара.",
    features: [
      "В любом офисе компании «СКИФ»",
      "При получении товара курьером",
      "Чек об оплате сразу на руки"
    ]
  },
  {
    icon: QrCode,
    title: "Оплата по QR-коду",
    description: "Быстрая и удобная оплата через мобильное приложение вашего банка.",
    features: [
      "Сканируйте QR-код",
      "Мгновенное подтверждение",
      "Без комиссии"
    ]
  },
  {
    icon: CreditCard,
    title: "Банковские карты",
    description: "Принимаем к оплате банковские карты VISA (кроме Electron) и MasterCard. Платёж проводится через защищённый шлюз Сбербанка после подтверждения менеджером.",
    features: [
      "VISA и MasterCard",
      "Защищённое соединение Сбербанка",
      "Проверка заказа менеджером"
    ]
  },
  {
    icon: Landmark,
    title: "Оплата через Сбербанк",
    description: "Распечатайте квитанцию с сайта и оплатите в любом отделении Сбербанка. Обратите внимание: банк берёт комиссию за проведение платежа.",
    features: [
      "Квитанция формируется на сайте",
      "Оплата в любом отделении",
      "Комиссия банка"
    ]
  },
  {
    icon: Building2,
    title: "Кредит «Покупай со Сбер»",
    description: "Программа кредитования для клиентов Сбербанка. Возраст от 21 до 65 лет, срок от 3 до 36 месяцев, сумма от 3 000 до 300 000 рублей.",
    features: [
      "Без первоначального взноса",
      "Срок от 3 до 36 месяцев",
      "Сумма от 3 000 до 300 000 ₽"
    ]
  }
];

const Payment = () => {
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
              <span className="text-primary-foreground">Оплата</span>
            </nav>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black text-primary-foreground mb-6">
              Способы оплаты
            </h1>
            <p className="text-xl text-primary-foreground/80 max-w-2xl">
              Компания «СКИФ» работает как с физическими, так и с юридическими лицами. 
              Выберите удобный способ оплаты вашего заказа.
            </p>
          </div>
        </section>

        {/* Payment Methods */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {paymentMethods.map((method, index) => {
                const Icon = method.icon;
                return (
                  <Card 
                    key={method.title} 
                    className="group hover:shadow-xl transition-all duration-300 animate-fade-in overflow-hidden"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CardContent className="p-8">
                      <div className="flex flex-col gap-4">
                        <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                          <Icon className="h-8 w-8 text-primary-foreground" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-heading font-bold text-foreground mb-2">
                            {method.title}
                          </h3>
                          <p className="text-muted-foreground mb-4 text-sm">
                            {method.description}
                          </p>
                          <ul className="space-y-2">
                            {method.features.map((feature, i) => (
                              <li key={i} className="flex items-center gap-2 text-sm text-foreground">
                                <CheckCircle2 className="h-4 w-4 text-accent shrink-0" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Detailed Info */}
        <section className="py-16 bg-muted/50">
          <div className="container">
            <div className="max-w-4xl mx-auto service-description">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-8 text-center">
                Подробная информация
              </h2>

              <div className="service-block">
                <h3 className="flex items-center gap-3">
                  <Users className="h-6 w-6 text-primary" />
                  Для физических лиц
                </h3>
                <p>
                  Оплата наличными производится в любой точке продаж «СКИФ» или представителю службы доставки при получении товара.
                </p>
                <p>
                  Также вы можете оплатить заказ банковской картой через защищённый платёжный шлюз Сбербанка или воспользоваться оплатой по QR-коду.
                </p>
              </div>

              <div className="service-block">
                <h3 className="flex items-center gap-3">
                  <Building2 className="h-6 w-6 text-primary" />
                  Для юридических лиц
                </h3>
                <p>
                  Компания «СКИФ» работает с юридическими лицами по безналичному расчёту. 
                  Для оформления заказа свяжитесь с менеджером для получения счёта на оплату.
                </p>
                <p>
                  При получении товара представитель организации должен иметь доверенность и печать.
                </p>
              </div>

              <div className="service-block highlight">
                <h3 className="flex items-center gap-3">
                  <CreditCard className="h-6 w-6 text-primary" />
                  Программа кредитования «Покупай со Сбер»
                </h3>
                <p>
                  Мы предлагаем удобную программу кредитования для клиентов Сбербанка:
                </p>
                <ul>
                  <li>Возраст заёмщика от 21 до 65 лет</li>
                  <li>Срок кредита от 3 до 36 месяцев</li>
                  <li>Сумма кредита от 3 000 до 300 000 рублей</li>
                  <li>Быстрое одобрение заявки</li>
                  <li>Без первоначального взноса</li>
                </ul>
                <p>
                  Для оформления кредита обратитесь к менеджеру в любом офисе компании «СКИФ».
                </p>
              </div>

              <div className="service-block">
                <h3 className="flex items-center gap-3">
                  <Truck className="h-6 w-6 text-primary" />
                  Доставка и получение товара
                </h3>
                <p>
                  Доставка товара осуществляется в течение 1-2 дней после поступления денежных средств на расчётный счёт компании.
                </p>
                <p>
                  При получении товара физическому лицу необходимо предъявить паспорт. 
                  Представителю юридического лица — доверенность и печать организации.
                </p>
              </div>

              <div className="info-block">
                <h3 className="flex items-center gap-3 !text-accent">
                  <FileText className="h-6 w-6 text-accent" />
                  Гарантийные обязательства
                </h3>
                <p>
                  Гарантийное обслуживание производится при наличии заполненного гарантийного талона. 
                  Обязательно сохраняйте чек об оплате — он потребуется для гарантийного обслуживания.
                </p>
              </div>

              <div className="service-block">
                <h3 className="flex items-center gap-3">
                  <AlertCircle className="h-6 w-6 text-primary" />
                  Отмена заказа
                </h3>
                <p>
                  Если вы хотите отказаться от заказа, вы можете обменять его на другой товар или получить полный возврат денежных средств. 
                  Для этого свяжитесь с менеджером компании.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 gradient-accent">
          <div className="container text-center">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-accent-foreground mb-6">
              Нужна консультация по оплате?
            </h2>
            <p className="text-accent-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
              Наши специалисты помогут выбрать оптимальный способ оплаты 
              и ответят на все ваши вопросы
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                size="lg" 
                className="bg-white text-accent hover:bg-white/90 font-bold"
              >
                Заказать звонок
              </Button>
              <a href="tel:+78002001636">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="font-bold border-white text-white bg-white/10 hover:bg-white hover:text-accent"
                >
                  <Phone className="mr-2 h-5 w-5" />
                  8 (800) 200-16-36
                </Button>
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Payment;
