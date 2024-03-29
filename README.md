# Project of Data Visualization (COM-480)

| Student's name | SCIPER |
| -------------- | ------ |
| Francisco Morales| 353614 |
| Julien Ars | 314545 |
| Blanche Duron | 282248 |

[Milestone 1](#milestone-1) • [Milestone 2](#milestone-2) • [Milestone 3](#milestone-3)

## Milestone 1 (29th March, 5pm)

### Dataset
The main dataset for this project is the **World Bank's EdStats**: [Education Statistics](https://datacatalog.worldbank.org/search/dataset/0038480/education-statistics). It encompasses education-related metrics such as enrollment rates, literacy rates, educational expenditure, and teacher-student ratios across countries worldwide since 1970.

We might also draw from **national education databases**, which can offer detailed insights into various facets of each country's education system, including curriculum standards, teacher qualifications, school facilities, and student performance.

Additionally, we plan to incorporate a few selected visuals from **school websites** and **Google Maps** to enhance our visualization, offering a more immersive experience and showcasing the real-world context of educational institutions.

### Problematic

> Exploring global education through interactive visuals to uncover the diversity and disparities within school systems across various landscapes.

Our visualization project aims to examine the diversity of schools in selected countries, including the USA, Mexico, Japan, India, and Switzerland. We will focus on comparing data between different areas, such as urban versus rural settings, or based on economic indicators. By analyzing a range of educational indicators and attributes, our goal is to illuminate the disparities and similarities in school systems across diverse geographic contexts. Motivated by a desire to showcase both the diversity and inequalities within education systems, our visualization will invite viewers to explore and reflect on the complex landscape of schooling worldwide.

### Exploratory Data Analysis

The World Bank proposes a very powerfull database exploration tool to explore the database.
This part contains results both from the World Bank [database exploratory tool](https://data.worldbank.org/topic/education?year=2021) and from the manual EDA that can be found in the notebook Milestone1.ipynb. 

![](img1.png)

![](img2.png)

![](img3.png)

| Indicator Code    |   ('Value', 'count') |   ('Value', 'mean') |   ('Value', 'std') |   ('Value', 'min') |   ('Value', '25%') |   ('Value', '50%') |   ('Value', '75%') |   ('Value', 'max') |
|:------------------|---------------------:|--------------------:|-------------------:|-------------------:|-------------------:|-------------------:|-------------------:|-------------------:|
| SE.ENR.PRIM.FM.ZS |                  202 |            0.955065 |           0.102914 |            0.64234 |           0.97177  |           0.997245 |            1.00147 |            1.11917 |
| SE.ENR.PRSC.FM.ZS |                  186 |            0.94515  |           0.115462 |            0.57842 |           0.94903  |           0.984555 |            1.00757 |            1.06606 |
| SE.ENR.SECO.FM.ZS |                  191 |            0.916871 |           0.164806 |            0.42186 |           0.900975 |           0.99398  |            1.01539 |            1.09846 |
| SE.ENR.TERT.FM.ZS |                  188 |            0.802857 |           0.314905 |            0.25705 |           0.511185 |           0.815725 |            1.00631 |            1.43254 |

|                              |   ('Value', 'count') |   ('Value', 'mean') |   ('Value', 'std') |   ('Value', 'min') |   ('Value', '25%') |   ('Value', '50%') |   ('Value', '75%') |   ('Value', 'max') |
|:-----------------------------|---------------------:|--------------------:|-------------------:|-------------------:|-------------------:|-------------------:|-------------------:|-------------------:|
| ('SE.ENR.PRIM.FM.ZS', 'CHE') |                   42 |            1.00428  |         0.00775295 |            0.99423 |           0.997185 |           1.0017   |           1.0115   |            1.01555 |
| ('SE.ENR.PRIM.FM.ZS', 'IND') |                   42 |            0.807618 |         0.150094   |            0.64234 |           0.676472 |           0.765135 |           0.868115 |            1.11917 |
| ('SE.ENR.PRIM.FM.ZS', 'JPN') |                   44 |            1.00026  |         0.001102   |            0.99821 |           0.999378 |           1.00025  |           1.00122  |            1.00213 |
| ('SE.ENR.PRIM.FM.ZS', 'MEX') |                   43 |            0.971385 |         0.0190269  |            0.9103  |           0.968015 |           0.97314  |           0.98545  |            0.99555 |
| ('SE.ENR.PRIM.FM.ZS', 'USA') |                   31 |            1.00137  |         0.0127098  |            0.98137 |           0.991135 |           0.99934  |           1.00939  |            1.03086 |
| ('SE.ENR.PRSC.FM.ZS', 'CHE') |                   37 |            0.962768 |         0.0144321  |            0.92878 |           0.95372  |           0.96542  |           0.972    |            0.98518 |
| ('SE.ENR.PRSC.FM.ZS', 'IND') |                   35 |            0.765072 |         0.162249   |            0.57842 |           0.618    |           0.74234  |           0.914885 |            1.06606 |
| ('SE.ENR.PRSC.FM.ZS', 'JPN') |                   42 |            1.006    |         0.00454697 |            0.99508 |           1.00128  |           1.00694  |           1.0103   |            1.01306 |
| ('SE.ENR.PRSC.FM.ZS', 'MEX') |                   43 |            0.973226 |         0.0491041  |            0.86284 |           0.94859  |           0.97551  |           1.02603  |            1.0339  |
| ('SE.ENR.PRSC.FM.ZS', 'USA') |                   29 |            1.01026  |         0.0101828  |            0.99642 |           1.00381  |           1.00754  |           1.01385  |            1.03635 |
| ('SE.ENR.SECO.FM.ZS', 'CHE') |                   37 |            0.933521 |         0.0260431  |            0.86662 |           0.91861  |           0.9367   |           0.94809  |            0.97532 |
| ('SE.ENR.SECO.FM.ZS', 'IND') |                   38 |            0.679159 |         0.190155   |            0.42186 |           0.505155 |           0.64215  |           0.833057 |            1.01328 |
| ('SE.ENR.SECO.FM.ZS', 'JPN') |                   42 |            1.01197  |         0.00844446 |            0.99272 |           1.00377  |           1.01302  |           1.0195   |            1.02611 |
| ('SE.ENR.SECO.FM.ZS', 'MEX') |                   43 |            0.956228 |         0.133037   |            0.63256 |           0.89952  |           0.99398  |           1.06607  |            1.09846 |
| ('SE.ENR.SECO.FM.ZS', 'USA') |                   31 |            1.00495  |         0.0831721  |            0.56187 |           1.0095   |           1.01716  |           1.02873  |            1.04388 |
| ('SE.ENR.TERT.FM.ZS', 'CHE') |                   38 |            0.680193 |         0.225227   |            0.36323 |           0.483075 |           0.60165  |           0.88976  |            1.02871 |
| ('SE.ENR.TERT.FM.ZS', 'IND') |                   35 |            0.567898 |         0.188625   |            0.28944 |           0.41848  |           0.53556  |           0.694815 |            0.98992 |
| ('SE.ENR.TERT.FM.ZS', 'JPN') |                   41 |            0.687763 |         0.187049   |            0.39196 |           0.50719  |           0.65155  |           0.87959  |            0.9262  |
| ('SE.ENR.TERT.FM.ZS', 'MEX') |                   31 |            0.812223 |         0.260462   |            0.25705 |           0.54705  |           0.92922  |           1.01076  |            1.04042 |
| ('SE.ENR.TERT.FM.ZS', 'USA') |                   43 |            1.20549  |         0.218318   |            0.68491 |           1.10479  |           1.29102  |           1.3758   |            1.43254 |



### Related work

- **What others have already done with the data?**

Many organizations, including the World Bank and UNESCO, have analyzed global education data, focusing primarily on broad statistics. These analyses often examine the number of individuals in a country who have access to education versus those who do not, providing a general overview of global education trends. There are numerous reports and summaries that describe these macro trends, highlighting overall progress and challenges in global education.

- **Why is your approach original?**

Unlike previous studies that concentrate on macro-level statistics, our project aims to delve into the nuances of educational diversity. We want to understand how educational experiences differ across regions, cultures, and socioeconomic backgrounds. By comparing aspects such as rural versus urban education or the disparities between rich and poor communities, our analysis will provide a more detailed view of the education landscape. This approach will allow us to explore the diversity of educational experiences beyond just numerical data, capturing the essence of how education varies worldwide.

- **What source of inspiration do you take? Visualizations that you found on other websites or magazines (might be unrelated to your data).**

Our project is inspired by the detailed visual storytelling found on Gapminder’s [Dollar Street](https://www.gapminder.org/dollar-street). This platform illustrates the living conditions of people at different income levels across various regions by showcasing everyday items like shoes, cutlery, and houses. Similarly, we aim to provide a detailed perspective on education around the world, moving beyond macro statistics to reveal the educational experiences across different socio-economic brackets and culture contexts.

- **In case you are using a dataset that you have already explored in another context (ML or ADA course, semester project...), you are required to share the report of that work to outline the differences with the submission for this class.**

Some of us worked on the same project for the ADA course. We did an analysis on bias in Wikipedia articles using a game called Wikispeedia. This project involved mapping links between articles and comparing the volume of content related to specific regions to highlight geographical biases. An initial step, for example, required creating a table with the population data of each country. We might use some of these macro statistics into our current analysis of global education. The project repositery can be found [here](https://github.com/epfl-ada/ada-2023-project-jellyfish401.git).

## Milestone 2 (26th April, 5pm)

**10% of the final grade**


## Milestone 3 (31st May, 5pm)

**80% of the final grade**


## Late policy

- < 24h: 80% of the grade for the milestone
- < 48h: 70% of the grade for the milestone

