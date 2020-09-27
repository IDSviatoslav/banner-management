## Инструкция по установке:
Все необходимое для запуска лежит в /build
1) *перемещение БД на MySQL сервер*:  
из-под root создать mysql пользователя bannerAppUser с паролем q3we2rty1:  
GRANT ALL PRIVILEGES ON *.* TO 'bannerAppUser'@'localhost' IDENTIFIED BY 'q3we2rty1';  
из /build импортировать:   
mysql -u bannerAppUser -p banner_web_repo < bannerDB.sql
2) *запуск server.jar*:  
из /build запустить:  
java -jar server.jar
3) *запуск client*:  
из /build запустить:  
npm install serve (при необходимости)  
serve -l 3000 -s client
