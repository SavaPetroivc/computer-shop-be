use computer_shop;
insert into role(role)
values ('USER');
insert into role(role)
values ('ADMINISTRATOR');
insert into role(role)
values ('WAREHOUSE_ADMINISTRATOR');

insert into user_contact_info(email, contact_phone)
values ('mail@example.com', '+38169432432');
insert into user(username, password, first_name, last_name, activated, user_contact_info_id, role_id)
VALUES ('admin', '$2b$10$qYOh/FacyAjlFRkir6khC.zrf9fd664gtO91DTpES7CW1eoFiWlkW', 'Marko', 'Jankovic', true,
        (select id from user_contact_info where email = 'mail@example.com'),
        (select id from role where role = 'ADMINISTRATOR'))
