import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { toast } from "sonner";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send,
  MessageCircle,
  Building2,
  Navigation,
  X,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import berggolts1 from "@/assets/offices/berggolts-1.jpg";
import berggolts2 from "@/assets/offices/berggolts-2.jpg";
import berggolts3 from "@/assets/offices/berggolts-3.jpg";
import parnas1 from "@/assets/offices/parnas-1.jpg";

// Общие фотографии для всех офисов
const officePhotos = [berggolts1, berggolts2, berggolts3, parnas1];

const formatPhone = (value: string): string => {
  const digits = value.replace(/\D/g, "");
  if (digits.length === 0) return "";
  if (digits.length <= 1) return `+7`;
  if (digits.length <= 4) return `+7 (${digits.slice(1)}`;
  if (digits.length <= 7) return `+7 (${digits.slice(1, 4)}) ${digits.slice(4)}`;
  if (digits.length <= 9) return `+7 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`;
  return `+7 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7, 9)}-${digits.slice(9, 11)}`;
};

const offices = [
  {
    id: 1,
    name: "Центральный офис",
    description: "Основная площадка: склад, сборка, офис",
    address: "г. Санкт-Петербург, ул. Ольги Берггольц, 38-А",
    phone: "+7 (921) 910-38-50",
    phone2: "+7 (967) 433-82-89",
    email: "zakaz@skif-avto.ru",
    hours: "Вт, Ср, Чт: 9:00–20:00; остальные дни: 9:00–18:00, без выходных",
    mapUrl: "https://yandex.ru/maps/-/CHQeZUOl",
    coords: [59.874889, 30.458669],
  },
  {
    id: 2,
    name: "СКИФ на Парнасе",
    description: "Дополнительная площадка продаж",
    address: "г. Санкт-Петербург, 1-й Верхний переулок, напротив дома 2А",
    phone: "+7 (921) 961-35-93",
    phone2: "+7 (967) 433-82-89",
    email: "parnas@skif-avto.ru",
    hours: "Вт, Ср, Чт: 9:00–20:00; остальные дни: 9:00–18:00, без выходных",
    mapUrl: "https://yandex.ru/maps/-/CHQeZUar",
    coords: [60.065486, 30.334189],
  },
];

const requisites = {
  company: 'ООО "СКИФ"',
  inn: "7811176819",
  kpp: "781101001",
  ogrn: "1037825018150",
  director: "Иванов Иван Иванович",
  address: "192019, г. Санкт-Петербург, ул. Ольги Берггольц, д. 38-А",
};

interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
  privacy?: string;
}

const Contacts = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
    privacy: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % officePhotos.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + officePhotos.length) % officePhotos.length);
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Введите ваше имя";
    }
    
    const phoneDigits = formData.phone.replace(/\D/g, "");
    if (phoneDigits.length < 11) {
      newErrors.phone = "Введите корректный номер телефона";
    }
    
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Введите корректный email";
    }
    
    if (!formData.privacy) {
      newErrors.privacy = "Необходимо согласие с политикой";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      toast.success("Сообщение отправлено! Мы свяжемся с вами в ближайшее время.");
      setFormData({ name: "", phone: "", email: "", message: "", privacy: false });
      setErrors({});
    }
  };

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
              <span className="text-primary-foreground">Контакты</span>
            </nav>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black text-primary-foreground mb-6">
              Контакты
            </h1>
            <p className="text-xl text-primary-foreground/80 max-w-2xl">
              Свяжитесь с нами любым удобным способом или приезжайте в наши офисы 
              в Санкт-Петербурге
            </p>
          </div>
        </section>

        {/* Quick Contacts */}
        <section className="py-12 bg-muted/50">
          <div className="container">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="text-center hover:shadow-lg transition-all">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center mx-auto mb-4">
                    <Phone className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h3 className="font-bold text-foreground mb-2">Телефон</h3>
                  <a href="tel:+78002001636" className="text-primary font-semibold hover:underline block">
                    +7 (800) 200-16-36
                  </a>
                  <span className="text-muted-foreground text-sm">Бесплатно по России</span>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-all">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-full gradient-accent flex items-center justify-center mx-auto mb-4">
                    <Mail className="h-6 w-6 text-accent-foreground" />
                  </div>
                  <h3 className="font-bold text-foreground mb-2">Email</h3>
                  <a href="mailto:zakaz@skif-avto.ru" className="text-primary font-semibold hover:underline block">
                    zakaz@skif-avto.ru
                  </a>
                  <span className="text-muted-foreground text-sm">Ответим в течение часа</span>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-all">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-full gradient-secondary flex items-center justify-center mx-auto mb-4">
                    <MessageCircle className="h-6 w-6 text-secondary-foreground" />
                  </div>
                  <h3 className="font-bold text-foreground mb-2">Мессенджеры</h3>
                  <div className="flex items-center justify-center gap-3">
                    <a href="https://t.me/skif_trailers" target="_blank" rel="noopener noreferrer" className="text-primary font-semibold hover:underline">
                      Telegram
                    </a>
                    <span className="text-muted-foreground">•</span>
                    <a href="https://max.ru" target="_blank" rel="noopener noreferrer" className="text-primary font-semibold hover:underline">
                      MAX
                    </a>
                  </div>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-all">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                    <Clock className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="font-bold text-foreground mb-2">Режим работы</h3>
                  <span className="text-foreground block text-sm">Вт, Ср, Чт: 9:00–20:00</span>
                  <span className="text-foreground block text-sm">Остальные дни: 9:00–18:00</span>
                  <span className="text-primary font-semibold text-sm">БЕЗ ВЫХОДНЫХ</span>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Offices */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="text-center mb-12">
              <Badge className="mb-4">Наши офисы</Badge>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
                Точки продаж в Санкт-Петербурге
              </h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {offices.map((office) => (
                <div key={office.id} className="space-y-4">
                  <Card className="overflow-hidden hover:shadow-xl transition-all">
                    <CardContent className="p-0">
                      {/* Map */}
                      <div className="h-64 w-full">
                        <iframe
                          src={`https://yandex.ru/map-widget/v1/?pt=${office.coords[1]},${office.coords[0]}&z=15&l=map`}
                          className="w-full h-full border-0"
                          title={`Карта ${office.name}`}
                          allowFullScreen
                        />
                      </div>
                      <div className="p-6">
                        <div className="flex items-start justify-between gap-4 mb-4">
                          <div>
                            <h3 className="text-xl font-bold text-foreground mb-1">{office.name}</h3>
                            <p className="text-muted-foreground text-sm">{office.description}</p>
                          </div>
                          <a 
                            href={office.mapUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="shrink-0"
                          >
                            <Button variant="outline" size="sm">
                              <Navigation className="h-4 w-4 mr-2" />
                              Маршрут
                            </Button>
                          </a>
                        </div>

                        <div className="space-y-3">
                          <div className="flex items-start gap-3">
                            <MapPin className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                            <span className="text-foreground">{office.address}</span>
                          </div>
                          <div className="flex items-start gap-3">
                            <Phone className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                            <div className="flex flex-col">
                              <a href={`tel:${office.phone.replace(/\D/g, '')}`} className="text-foreground hover:text-primary transition-colors font-medium">
                                {office.phone}
                              </a>
                              {office.phone2 && (
                                <a href={`tel:${office.phone2.replace(/\D/g, '')}`} className="text-foreground hover:text-primary transition-colors font-medium">
                                  {office.phone2}
                                </a>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Mail className="h-5 w-5 text-primary shrink-0" />
                            <a href={`mailto:${office.email}`} className="text-foreground hover:text-primary transition-colors">
                              {office.email}
                            </a>
                          </div>
                          <div className="flex items-center gap-3">
                            <Clock className="h-5 w-5 text-primary shrink-0" />
                            <span className="text-muted-foreground">{office.hours}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Photo Gallery */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {officePhotos.map((photo, idx) => (
                      <div 
                        key={idx} 
                        className="aspect-video overflow-hidden rounded-xl cursor-pointer group"
                        onClick={() => openLightbox(idx)}
                      >
                        <img 
                          src={photo} 
                          alt={`${office.name} - фото ${idx + 1}`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form & Requisites */}
        <section className="py-16 md:py-24 bg-muted/50">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Form */}
              <div>
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-6">
                  Напишите нам
                </h2>
                <p className="text-muted-foreground mb-8">
                  Заполните форму, и мы свяжемся с вами в ближайшее время
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Ваше имя *</Label>
                      <Input
                        id="name"
                        placeholder="Иван Петров"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className={errors.name ? "border-destructive" : ""}
                      />
                      {errors.name && (
                        <span className="text-destructive text-sm">{errors.name}</span>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Телефон *</Label>
                      <Input
                        id="phone"
                        placeholder="+7 (___) ___-__-__"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: formatPhone(e.target.value) })}
                        className={errors.phone ? "border-destructive" : ""}
                      />
                      {errors.phone && (
                        <span className="text-destructive text-sm">{errors.phone}</span>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="example@mail.ru"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={errors.email ? "border-destructive" : ""}
                    />
                    {errors.email && (
                      <span className="text-destructive text-sm">{errors.email}</span>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Сообщение</Label>
                    <Textarea
                      id="message"
                      placeholder="Ваш вопрос или комментарий..."
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>

                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="privacy"
                      checked={formData.privacy}
                      onCheckedChange={(checked) => setFormData({ ...formData, privacy: checked as boolean })}
                    />
                    <Label htmlFor="privacy" className="text-sm text-muted-foreground leading-relaxed cursor-pointer">
                      Я согласен на обработку персональных данных в соответствии с{" "}
                      <Link to="/privacy" className="text-primary hover:underline">
                        политикой конфиденциальности
                      </Link>
                    </Label>
                  </div>
                  {errors.privacy && (
                    <span className="text-destructive text-sm block -mt-4">{errors.privacy}</span>
                  )}

                  <Button type="submit" size="lg" className="w-full sm:w-auto gradient-primary font-bold">
                    <Send className="mr-2 h-5 w-5" />
                    Отправить сообщение
                  </Button>
                </form>
              </div>

              {/* Requisites */}
              <div>
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-6">
                  Реквизиты компании
                </h2>
                <p className="text-muted-foreground mb-8">
                  Официальные реквизиты для заключения договоров и оплаты
                </p>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center">
                        <Building2 className="h-7 w-7 text-primary-foreground" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-foreground">{requisites.company}</h3>
                        <p className="text-muted-foreground">Официальный представитель</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-between items-center py-3 border-b border-border">
                        <span className="text-muted-foreground">ИНН</span>
                        <span className="font-medium text-foreground">{requisites.inn}</span>
                      </div>
                      <div className="flex justify-between items-center py-3 border-b border-border">
                        <span className="text-muted-foreground">КПП</span>
                        <span className="font-medium text-foreground">{requisites.kpp}</span>
                      </div>
                      <div className="flex justify-between items-center py-3 border-b border-border">
                        <span className="text-muted-foreground">ОГРН</span>
                        <span className="font-medium text-foreground">{requisites.ogrn}</span>
                      </div>
                      <div className="py-3 border-b border-border">
                        <span className="text-muted-foreground block mb-1">Юридический адрес</span>
                        <span className="font-medium text-foreground">{requisites.address}</span>
                      </div>
                      <div className="py-3">
                        <span className="text-muted-foreground block mb-1">Генеральный директор</span>
                        <span className="font-medium text-foreground">{requisites.director}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Photo Lightbox Modal */}
      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent className="max-w-5xl w-full p-0 bg-black/95 border-none">
          <div className="relative w-full h-[80vh] flex items-center justify-center">
            {/* Close button */}
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <X className="h-6 w-6 text-white" />
            </button>

            {/* Previous button */}
            <button
              onClick={prevImage}
              className="absolute left-4 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <ChevronLeft className="h-8 w-8 text-white" />
            </button>

            {/* Image */}
            <img
              src={officePhotos[currentImageIndex]}
              alt={`Фото офиса ${currentImageIndex + 1}`}
              className="max-h-full max-w-full object-contain"
            />

            {/* Next button */}
            <button
              onClick={nextImage}
              className="absolute right-4 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <ChevronRight className="h-8 w-8 text-white" />
            </button>

            {/* Image counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-white/10 rounded-full text-white text-sm">
              {currentImageIndex + 1} / {officePhotos.length}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Contacts;
