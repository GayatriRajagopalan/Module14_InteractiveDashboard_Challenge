// Build the metadata panel
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // get the metadata field
    let metadata = data.metadata;
    sample = parseInt(sample);
    // Filter the metadata for the object with the desired sample number
    let result = metadata.filter((item)=>item.id === sample)[0];

    // Use d3 to select the panel with id of `#sample-metadata`
    let metadataPanel = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    metadataPanel.html("");

    // Inside a loop, you will need to use d3 to append new
    // tags for each key-value in the filtered metadata.
    for (let key in result){      
      metadataPanel.append("p").text(`${key.toUpperCase()}: ${result[key]}`);
    }
    

  });
}

// function to build both charts
function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
    sample = parseInt(sample);
    // Get the samples field
    console.log(data.samples);
    let samples = data.samples;
    
    // Filter the samples for the object with the desired sample number
    
    let result = samples.filter(sampleObj => parseInt(sampleObj.id) === sample)[0];
    
    // Get the otu_ids, otu_labels, and sample_values
    
    let otu_ids = result.otu_ids;
    let otu_labels = result.otu_labels;
    let sample_values = result.sample_values;
    // Build a Bubble Chart
    let trace1 = {
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      mode: 'markers',
      marker:{
        size: sample_values,
        color: otu_ids,
        colorscale:'Earth'
      }      
    }
    let layout = {
      title: 'Bacteria Cultures per Sample',
      xaxis : {
        title: 'OTU ID'
      },
      height: 500     
    };
    // Render the Bubble Chart
    Plotly.newPlot('bubble', [trace1], layout);    

    // Don't forget to slice and reverse the input data appropriately
    let combinedObject = [{sample_values: result.sample_values.slice(0,10)}, 
      {otu_ids: result.otu_ids.slice(0,10)},
      {labels: result.otu_labels.slice(0,10)}
    ]

    let sortedList = combinedObject[0].sample_values
      .map((value, index) => (
        {
        sample_value: value,
        otu_id: combinedObject[1].otu_ids[index],
        labels: combinedObject[2].labels[index]
        }
      )).sort((a,b) => a.sample_value - b.sample_value);

    // Build a Bar Chart

    // For the Bar Chart, map the otu_ids to a list of strings for your yticks
    let trace21 = {
      x: sortedList.map(d => d.sample_value),
      y: sortedList.map(d => `OTU ${d.otu_id}`),
      text: sortedList.map(d => d.labels),
      type:'bar',
      orientation: 'h'
    }

    let layout21 = {
      title: 'Top 10 Bacteria Cultures Found',
      xaxis : {
      title: 'Number of Bacteria'
    }      
  };


    // Render the Bar Chart
    Plotly.newPlot('bar', [trace21], layout21);
  });
}

// Function to run on page load
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
    console.log(data);
    // Get the names field
    let names = data.names;
    
    // Use d3 to select the dropdown with id of `#selDataset`
    let dataset = d3.select('#selDataset');

    // Use the list of sample names to populate the select options
    for (item of names) {
      dataset.append('option').text(item).property('value', item);
    }    
    // Hint: Inside a loop, you will need to use d3 to append a new
    // option for each sample name.
    

    // Get the first sample from the list
    
    let firstSample = parseInt(names[0]);
  
    // Build charts and metadata panel with the first sample:sample_values, otu_ids,...otu_labels
    buildCharts(firstSample);
    buildMetadata(firstSample);
        
    

  });
}

// Function for event listener
function optionChanged(newSample) {
  buildCharts(newSample);
  buildMetadata(newSample);

}

// Initialize the dashboard
init();
