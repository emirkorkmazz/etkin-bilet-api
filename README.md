# Etkin Bilet API

## Proje Açıklaması

Etkin Bilet, kullanıcıların etkinliklere bilet satın alabildiği ve etkinlik yönetimi yapabildiği bir platformdur. NestJS ve TypeScript kullanılarak geliştirilmiştir.

## Özellikler

### Kullanıcı İşlemleri
- Kullanıcı kayıt ve giriş
- Profil güncelleme
- Şifre değiştirme

### Etkinlik Yönetimi
- Etkinlik oluşturma
- Etkinlik güncelleme
- Etkinlik silme
- Etkinlik arama ve listeleme

### Bilet İşlemleri
- Bilet satın alma
- Etkinlik için bilet yönetimi

## Teknolojiler

- NestJS
- TypeORM
- PostgreSQL
- Passport.js (JWT Authentication)
- Swagger (API Dokümantasyonu)
- Class Validator
- TypeScript

## Gereksinimler

- Node.js (v18+)
- PostgreSQL
- npm veya yarn

## Kurulum

1. Depoyu klonlayın

```bash
git clone https://github.com/kullanici_adi/etkin-bilet-api.git
cd etkin-bilet-api
```

2. Bağımlılıkları yükleyin

```bash
npm install
```

3. `.env` dosyasını yapılandırın

```bash
cp .env.example .env
```
```bash

# JWT Configuration
JWT_SECRET="Your very long and secure secret key"
JWT_EXPIRATION="Your expiration time"

# PostgreSQL Database Configuration
POSTGRES_HOST="Your database host"
POSTGRES_PORT="Your database port"
POSTGRES_DB="Your database name"
POSTGRES_USER="Your database username"
POSTGRES_PASSWORD="Your database password"
```

4.PostgreSQL'de veritabanı oluşturun

```bash
CREATE DATABASE etkin_bilet_db;
```

5. Uygulamayı başlatın

```bash
npm run start:dev
```


## Katkıda Bulunma

1. Fork yapın
2. Yeni bir branch oluşturun (`git checkout -b feature/AmazingFeature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add some AmazingFeature'`)
4. Branchi push edin (`git push origin feature/AmazingFeature`)
5. Bir Pull Request açın

## Lisans

Bu proje MIT Lisansı altında yayınlanmıştır.

## İletişim

- Proje Linki: [https://github.com/emirkorkmazz/etkin-bilet-api](https://github.com/emirkorkmazz/etkin-bilet-api)
- E-posta: emirkorkmaz000@gmail.com
