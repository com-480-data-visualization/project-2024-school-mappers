# SchoolMappers : Process Book

## The Vision

> Exploring global education through interactive visuals to uncover the diversity and disparities within school systems across various landscapes.

The School Mapper project aims to showcase the diversity and inequality of schools in 5 selected countries: Switerland, the United States, Japan, Mexico and India. The viewer can visualise and compare individual schools against a background of national global indicators, about the country's society and its education system. 
The website shows side-to-side pictures of school's facilities, their tuition and their neighbourhood as well as the countries' investment on education, human development indicators, income inequality as well as test results averages.
Through this range of data, the visualization invite viewers to notice differences as well as similarities between schools in different settings.

## The Path

The project was originally inspired by Gapminder’s [Dollar Street](https://www.gapminder.org/dollar-street) visual storytelling. If Dollar Street is about the living conditions of people at different income levels across various regions by showcasing everyday items like shoes, cutlery, and house, we aimed to build a similar perspective on education around the world. Moving beyond macro statistics to reveal the educational experiences across different socio-economic brackets and culture contexts.

However, such a visualisation represented a challenge. There does not exist such a comprehensive database about schools in different countries and accross different income levels. During the month of March, we looked up different datasets about education, and selected the [World Bank's EdStats](https://datacatalog.worldbank.org/search/dataset/0038480/education-statistics) dataset. It compiles different education-related metrics such as enrollment rates, literacy rates, educational expenditure, and teacher-student ratios from different sources, notably UNESCO, accross different countries and years. We explored that dataset, noticed some missing values, and made a first selection of indicators (See our [Milestone 1 Data Analysis](Milestone1.md) for more details). We also decided to reduce our visualisation to a limited number of countries (5 : India, Japan, Mexico, Switzerland, the United States) and of schools per country. 

For the second milestone, during the month of April, we refined our objective and precised what we wanted to see in the visualisation. We choose the final concept of the website, still inspired by Dollar Street but with different levels. We kept the ability of the user to move transversaly between schools and/or countries using the indicators or the pictures (selecting an image of a cafetaria will show images of cafetarias of different schools, which allow to change school). But added the possibility to zoom in (from countries to school) or out (from schools to countries) easily. We will add a start page, with the different countries presented through general indicators, and keep the user's previous lookup visible using an "infinite scrool" concept.
Another decision made at this stage was to only use the latest available data, forgetting the time dimension to simplify the visualisations and better convey our ideas.

Then at the end of the project, during the month of May, we made our idea a reality. We processed the dataset to select only the indicators and countries we wanted and refactor it to match our website's process. We supplemented the dataset with data from the [United Nation's Development Programme office](https://hdr.undp.org), to have data about the income inequalities and human development index.
We also researched images and data about individual schools in the different countries. As said earlier, we did not find a comprehensive dataset with what we wanted, so we had to create it. 

[TODO: maybe add here a sentence about how the micro data was collected] 
Finally, we made the website, using React and D3, inplementing the idea we had.

## The Challenges

[TODO: structure the challenges by milestones and then by feature ? and then for the "changes we made along the way part" we would explain the potential change due to the challenge encountered]
eg: 
- Milestone 1:
        - data source
        - idea generation
- Milestone 2:
        - scope of project too large
        - macro data incomplete
        - micro data inexistant as a data set, has to be fetch by hand
        - ...

  
The first challenge we encountered was the missing data about the schools. Believing in our visualisation idea, we made the decision to do the work of looking for data individually for the schools instead of changing our project, altough we reduced the expectations to 2 schools per country, comming repectively from a "rich" and a "poor" neighborhood. The project is however easily scalable, and could be expanded with minimal effort to more data.

We also noticed that even for data coming from renowed institutions (World Bank, United Nations), there would be gaps, for example Japan having very old enrolment data...


## The Changes we made along the way

We had to scale back the project faced with the harsh realities of the student's time. In particular, ...
[Todo : insert what we said we would do in milestone 2 we did not do in the end]


## The Team

All members were very involved in the different steps of the project, especially working together on defining the concepts of our visualisation.

### Blanche

Blanche wrote the project's problematic and description for Milestone 1 with Francisco, and helped Julien with the Data Analysis. She made the backbone for Milestone 2 and made most of the final website.

### Francisco

Franciso also wrote the project's problematic and description for Milestone 1 with Blanche. He wrote most of the Milestone 2 document with Julien and looked up the data for the individual schools. He also ...

### Julien

Julien made most of the Data Analysis for Milestone 1. He made the sketches for Milestone 2 and processed the data for the final project. He then worked on the process book and...
