# fullstackopen_part3

Rest toteutukselle tehty Visual Studio Code Rest työkalulla tallennettu reguest, jota voidaan käyttää hyödyksi.


Tehtävien palautukset:

[phonebook-api/](phonebook-api/)

## 3.1 puhelinluettelon backend step1

VS Code rest kutsu:

[phonebook-api/requests/get_all_persons.rest)](phonebook-api/requests/get_all_persons.rest)

## 3.2: puhelinluettelon backend step2

[phonebook-api/requests/get_info_reguest.rest)](phonebook-api/requests/get_info_reguest.rest)

## 3.3: puhelinluettelon backend step3

Person found on server:
[phonebook-api/requests/get_person_2_who_found.rest](phonebook-api/requests/get_person_2_who_found.rest)

Person not found:
[phonebook-api/requests/get_person_999_not_found.rest](phonebook-api/requests/get_person_999_not_found.rest)


## 3.4: puhelinluettelon backend step4

Implemented so that if the person to be deleted is found, the deletion is done and an HTTP status code 204 is returned. If the person to be deleted is not found, a 404 HTTP status code is returned. I like this approach, which I have been using in the C# world for 20 years.

Try to delete nonexists person:
[phonebook-api/requests/delete_non_exits_person.rest](phonebook-api/requests/delete_non_exits_person.rest)

Delete existing person:
[phonebook-api/requests/delete_person_number_2_exists.rest](phonebook-api/requests/delete_person_number_2_exists.rest)

## 3.5: puhelinluettelon backend step5

[phonebook-api/requests/create_new_person.rest](phonebook-api/requests/create_new_person.rest)

## 3.6: puhelinluettelon backend step6

Add empty person information, return all errors on one.

[phonebook-api/requests/create_new_person_empty_fields.rest](phonebook-api/requests/create_new_person_empty_fields.rest)

Try add missing name information to person

[phonebook-api/requests/create_new_person_missing_name.rest](phonebook-api/requests/create_new_person_missing_name.rest)

Try add missing phonenumber information to person

[phonebook-api/requests/create_new_person_missing_phonenumber.rest](phonebook-api/requests/create_new_person_missing_phonenumber.rest)

Tryt add just added person again:

[phonebook-api/requests/create_new_person_dublicate.rest](phonebook-api/requests/create_new_person_dublicate.rest)

Add new person

[phonebook-api/requests/delete_non_exits_person.rest](phonebook-api/requests/delete_non_exits_person.rest)

3.7: puhelinluettelon backend step7

No spesific .rest file, use anything. 

3.8*: puhelinluettelon backend step8

Try ay post action .rest files
[phonebook-api/requests/create_new_person.rest](phonebook-api/requests/create_new_person.rest)

[phonebook-api/requests/create_new_person_dublicate.rest](phonebook-api/requests/create_new_person_dublicate.rest)

[phonebook-api/requests/create_new_person_empty_fields.rest](phonebook-api/requests/create_new_person_empty_fields.rest)

[phonebook-api/requests/create_new_person_missing_name.rest](phonebook-api/requests/create_new_person_missing_name.rest)

[phonebook-api/requests/create_new_person_missing_phonenumber.rest](phonebook-api/requests/create_new_person_missing_phonenumber.rest)

[phonebook-api/requests/create_new_person_new_perons.rest](phonebook-api/requests/create_new_person_new_perons.rest)


## 3.9 puhelinluettelon backend step9

Done.
## 3.10 puhelinluettelon backend step10

Sovelluksen osoite:
https://fullstackopen-part3-dmc2.onrender.com/

Rest API test call
[phonebook/src/requests/get_all_persons.rest](phonebook/src/requests/get_all_persons.rest)

## 3.11 puhelinluettelo full stack

## 3.12: tietokanta komentoriviltä

File is:
[phonebook-api/index.js](phonebook-api/index.js)