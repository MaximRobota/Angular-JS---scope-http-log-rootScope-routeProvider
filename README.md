Single-page application, состоящее из двух экранов-страниц.
На индексной странице расположена таблица со списком задач. Cписок получен из файла tasks.json.

В таблице вывел только активные задачи (поле ‘obj_status’ имеет значение ‘active’);
Кроме имени задачи также вывел теги (поле ‘tags’), время потраченное на задачу (‘actual_effort’), общую оценку задачи (‘estimated_effort’), и дату окончания задачи (‘due_date’) в каком-нибудь человеко-понятном формате;
Название важных задач (‘is_high_priority’) должны выделяться (жирным/другим цветом).

При клике на название задачи в таблице пользователь, происходит переход на страницу задачи.

На странице задачи вывел дополнительную информацию о задаче (например description);
при клике на название задачи оно редактироваться (inlineeditor) и после сохранения задача отправляться на сервер. PUT-запрос 

Использованы сервисы Angular, такие как $http/$resource, $route, promises, контроллеры, директивы.

Код покрыт юнит тестами в степени.


