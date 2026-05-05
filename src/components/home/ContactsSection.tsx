import { Phone, Mail, MapPin, Clock, Send, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import React, { useState } from "react";
import maxIcon from "@/assets/messengers/max.png";

const formatPhone = (value: string): string => {
  const digits = value.replace(/\D/g, '').slice(0, 11);
  if (digits.length === 0) return '';
  if (digits.length <= 1) return `+${digits}`;
  if (digits.length <= 4) return `+${digits[0]} (${digits.slice(1)}`;
  if (digits.length <= 7) return `+${digits[0]} (${digits.slice(1, 4)}) ${digits.slice(4)}`;
  if (digits.length <= 9) return `+${digits[0]} (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`;
  return `+${digits[0]} (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7, 9)}-${digits.slice(9, 11)}`;
};

interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
  privacy?: string;
}

const ContactsSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
    privacy: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Введите ваше имя";
    }

    // Check if phone is complete (all digits filled)
    const phoneDigits = formData.phone.replace(/\D/g, "");
    if (phoneDigits.length < 11) {
      newErrors.phone = "Введите корректный номер телефона";
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Введите корректный email";
    }

    if (!formData.privacy) {
      newErrors.privacy = "Необходимо согласие на обработку данных";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Form is valid, handle submission
      console.log("Form submitted:", formData);
      // Reset form
      setFormData({ name: "", phone: "", email: "", message: "", privacy: false });
      setErrors({});
    }
  };

  return (
    <section className="py-16 md:py-24 bg-muted/50 overflow-hidden">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Info */}
          <div className="space-y-8 min-w-0">
            <div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
                Свяжитесь с нами
              </h2>
              <p className="text-lg text-muted-foreground">
                Готовы ответить на ваши вопросы и помочь с выбором
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {/* Phone */}
              <Card className="border-2 hover:border-primary/30 transition-colors overflow-hidden">
                <CardContent className="p-4 sm:p-5">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl gradient-primary flex items-center justify-center mb-3 sm:mb-4">
                    <Phone className="h-5 w-5 sm:h-6 sm:w-6 text-primary-foreground" />
                  </div>
                  <h3 className="font-heading font-bold text-foreground mb-2">Телефон</h3>
                  <a href="tel:+78002001636" className="text-base sm:text-lg font-semibold text-primary hover:underline break-all">
                    +7 (800) 200-16-36
                  </a>
                  <p className="text-sm text-muted-foreground mt-1">Звонок бесплатный</p>
                </CardContent>
              </Card>

              {/* Email */}
              <Card className="border-2 hover:border-primary/30 transition-colors overflow-hidden">
                <CardContent className="p-4 sm:p-5">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl gradient-secondary flex items-center justify-center mb-3 sm:mb-4">
                    <Mail className="h-5 w-5 sm:h-6 sm:w-6 text-secondary-foreground" />
                  </div>
                  <h3 className="font-heading font-bold text-foreground mb-2">Email</h3>
                  <a href="mailto:zakaz@skif-avto.ru" className="text-base sm:text-lg font-semibold text-primary hover:underline break-all">
                    zakaz@skif-avto.ru
                  </a>
                  <p className="text-sm text-muted-foreground mt-1">Ответим за 2 часа</p>
                </CardContent>
              </Card>

              {/* Address */}
              <Card className="border-2 hover:border-primary/30 transition-colors overflow-hidden">
                <CardContent className="p-4 sm:p-5">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl gradient-accent flex items-center justify-center mb-3 sm:mb-4">
                    <MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-accent-foreground" />
                  </div>
                  <h3 className="font-heading font-bold text-foreground mb-2">Адрес</h3>
                  <p className="text-foreground text-sm sm:text-base">Санкт-Петербург, ул. Ольги Берггольц, д. 38-А</p>
                  <p className="text-sm text-muted-foreground mt-1">Рядом с метро</p>
                </CardContent>
              </Card>

              {/* Working hours */}
              <Card className="border-2 hover:border-primary/30 transition-colors overflow-hidden">
                <CardContent className="p-4 sm:p-5">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-foreground flex items-center justify-center mb-3 sm:mb-4">
                    <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-background" />
                  </div>
                  <h3 className="font-heading font-bold text-foreground mb-2">Режим работы</h3>
                  <div className="text-foreground text-xs sm:text-sm">
                    <p>Вт, Ср, Чт: <span className="font-semibold">9:00–20:00</span></p>
                    <p>Остальные дни: <span className="font-semibold">9:00–18:00</span></p>
                    <p className="text-primary font-semibold">БЕЗ ВЫХОДНЫХ</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Yandex Map */}
            <div className="rounded-2xl overflow-hidden border-2 border-border">
              <div className="relative w-full h-[280px] sm:h-[330px]">
                <iframe 
                  src="https://yandex.ru/map-widget/v1/org/skif/183604077331/?ll=30.449997%2C59.868789&z=16"
                  width="100%" 
                  height="100%" 
                  frameBorder="0" 
                  allowFullScreen
                  title="Карта расположения СКИФ"
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="min-w-0">
            <Card className="border-2 shadow-lg overflow-hidden">
              <CardContent className="p-4 sm:p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center">
                    <MessageCircle className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-xl text-foreground">
                      Напишите нам
                    </h3>
                    <p className="text-sm text-muted-foreground">Ответим в течение часа</p>
                  </div>
                </div>

                <form className="space-y-5" onSubmit={handleSubmit}>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Имя *</label>
                      <Input 
                        placeholder="Ваше имя" 
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className={errors.name ? "border-destructive" : ""}
                      />
                      {errors.name && (
                        <p className="text-sm text-destructive">{errors.name}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Телефон *</label>
                      <Input 
                        type="tel" 
                        placeholder="+7 (___) ___-__-__"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: formatPhone(e.target.value) })}
                        className={errors.phone ? "border-destructive" : ""}
                      />
                      {errors.phone && (
                        <p className="text-sm text-destructive">{errors.phone}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Email</label>
                    <Input 
                      type="email" 
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={errors.email ? "border-destructive" : ""}
                    />
                    {errors.email && (
                      <p className="text-sm text-destructive">{errors.email}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Сообщение</label>
                    <Textarea 
                      placeholder="Опишите ваш вопрос или задачу..." 
                      className="min-h-[120px] resize-none"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-start gap-3">
                      <input 
                        type="checkbox" 
                        id="privacy" 
                        className="mt-1"
                        checked={formData.privacy}
                        onChange={(e) => setFormData({ ...formData, privacy: e.target.checked })}
                      />
                      <label htmlFor="privacy" className="text-sm text-muted-foreground">
                        Я согласен на обработку персональных данных в соответствии с{" "}
                        <a href="/privacy" className="text-primary hover:underline">
                          политикой конфиденциальности
                        </a>
                      </label>
                    </div>
                    {errors.privacy && (
                      <p className="text-sm text-destructive ml-6">{errors.privacy}</p>
                    )}
                  </div>

                  <Button type="submit" size="lg" className="w-full gradient-accent font-bold text-lg">
                    <Send className="mr-2 h-5 w-5" />
                    Отправить сообщение
                  </Button>
                </form>

                {/* Alternative contact */}
                <div className="mt-6 pt-6 border-t border-border text-center">
                  <p className="text-sm text-muted-foreground mb-3">
                    Или свяжитесь с нами напрямую:
                  </p>
                  <div className="flex justify-center gap-4">
                    <a 
                      href="https://max.ru/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center hover:opacity-80 transition-opacity"
                    >
                      <img src={maxIcon} alt="MAX" className="w-full h-full object-cover" />
                    </a>
                    <a 
                      href="https://t.me/skifavto" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center hover:opacity-80 transition-opacity"
                    >
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactsSection;
