INSERT INTO users (name, email, role, rate)
VALUES ('God', 'god@mail.com', 'goodness', 7);
/* user: god is id: 76 */
/* project: OverBooking is id: 3 */
/* project: Line Balancing is id: 2 */
;
;
;
/*God and Over Booking with project_users_id = 18 */
/* God and Line Balancing with project_users_id = 19 */
insert into projects_users (user_id, project_id, total_budget)
values (80, 3, 1234),
  (80, 2, 134);
;
;
;
;
/* Gond and Over Booking - daily_logs */
insert into daily_logs (project_users_id, date, hours)
values (18, '2023-10-01', 1),
  (18, '2023-10-02', 2),
  (18, '2023-10-03', 3),
  (18, '2023-10-04', 4);
/* Gond and Line Balancing - daily_logs */
insert into daily_logs (project_users_id, date, hours)
values (19, '2023-10-05', 1),
  (19, '2023-10-06', 2),
  (19, '2023-10-07', 3),
  (19, '2023-10-08', 4);