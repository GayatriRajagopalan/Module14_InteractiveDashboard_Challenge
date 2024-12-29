# Belly Button Biodiversity Dashboard

# Overview

This project involves building an interactive dashboard that visualizes the Belly Button Biodiversity dataset, which displays the microbial species that are present in human navels. The goal is to create a dashboard that allows users to interact with the data by selecting samples from the dropdown option in the browser, which will then display charts based on the chosen sample input.

# Project Description:

The javascript application consists of four different functions:

# Init Function:

The init function retrieves data from a URL using the d3 library. The returned promise is processed with a .then method to extract the data. Using d3, it selects the dropdown menu in the HTML, adds an 'option' tag, and populates it with data via a loop. The first sample from the data is selected and passed as an argument to the functions that build the bubble chart and bar chart, as well as display the metadata.

# BuildCharts Function:

This function receives the input sample argument from the init function and generates both a bubble chart and a bar chart. The bar chart displays the top 10 bacteria cultures found in an individual based on the sample data, while the bubble chart shows all the bacteria cultures in the sample data. The size of each bubble corresponds to the sample value. This function is also called by the optionChanged function.

# BuildMetadata Function:

This function receives the input sample data from the init function and displays the corresponding metadata. It is also invoked by the optionChanged function.

# OptionChanged Function:

This function calls the buildCharts and buildMetadata functions whenever the user selects or changes a sample number in the dropdown menu in the browser.

# File locations:

1. The app.js file is located in the static/js/ folder.
2. The index.html file is in the root directory.
