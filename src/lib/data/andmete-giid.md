# Mida mitte teha

1. **Ära muuda struktuuri**: Vältige JSON struktuuri muutmist, näiteks võtmete eemaldamist või ümbernimetamist. See võib rikkuda andmete parsimise loogikat.

2. **Ära kasuta vigast JSON süntaksit**: Veenduge, et JSON süntaks on korrektne. See hõlmab õiget sulgude, komade ja jutumärkide osas.

3. **Palun kirjuta sama moodi mis teistel**: Vaata, et on kirjutatud ilusti. Näiteks oleks ilus **IT-süsteemide administreerimine** ja mitte it sys admin!

# JSON andmehulgad failis mentorid.json

## name
- **Kirjeldus**: Mentori nimi
- **Tüüp**: string

## age
- **Kirjeldus**: Mentori vanus
- **Tüüp**: number

## photo
- **Kirjeldus**: Foto failinimi
- **Tüüp**: string

## speciality
- **Kirjeldus**: Mentori eriala
- **Tüüp**: string

## teams
- **Kirjeldus**: Meeskonnad, kuhu mentor kuulub
- **Tüüp**: massiv stringidest

## term
- **Kirjeldus**: Mentori ametiaeg
- **Tüüp**: number

## contactMethods
- **Kirjeldus**: Kontaktmeetodid
- **Tüüp**: massiv objektidest
    - **name**: Kontaktmeetodi nimi (string)
    - **value**: Kontaktmeetodi väärtus (string)

## description
- **Kirjeldus**: Lühikirjeldus mentorist
- **Tüüp**: string

## activities
- **Kirjeldus**: Mentori tegevused ja huvid
- **Tüüp**: string

# JSON andmehulgad failis pastManagement.json

## year
- **Kirjeldus**: Aasta
- **Tüüp**: number

## members
- **Kirjeldus**: Liikmete nimekiri
- **Tüüp**: massiv objektidest
    - **name**: Liikme nimi (string)
    - **image**: Liikme pildi failinimi (string)

# JSON andmehulgad failis currentManagement.json

## name
- **Kirjeldus**: Juhatuse liikme nimi
- **Tüüp**: string

## photo
- **Kirjeldus**: Foto failinimi
- **Tüüp**: string

## role
- **Kirjeldus**: Juhatuse liikme roll
- **Tüüp**: string

## subrole
- **Kirjeldus**: Juhatuse liikme alaroll
- **Tüüp**: string

## email
- **Kirjeldus**: Juhatuse liikme e-posti aadress
- **Tüüp**: string

## phone
- **Kirjeldus**: Juhatuse liikme telefoninumber
- **Tüüp**: string

# JSON andmehulgad failis koolitusteGraafik.json

## plannedEvents
- **Kirjeldus**: Planeeritud sündmuste nimekiri
- **Tüüp**: massiv objektidest
    - **eventName**: Sündmuse nimi (string)
    - **date**: Sündmuse kuupäev (string)
    - **time**: Sündmuse kellaaeg (string)
    - **location**: Sündmuse asukoht (string)
    - **collaborator**: Koostööpartner (string)