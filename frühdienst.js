document.getElementById('aufgaben-Aufnahmedienst').addEventListener('click', function() {
    var panelBody = document.getElementById('aufgaben-Aufnahmedienst-panel-body');
    var panelIcon = document.getElementById('aufgaben-Aufnahmedienst-panel-icon');
    
    // Toggle display of the panel body
    if (panelBody.style.display === 'none' || panelBody.style.display === '') {
        panelBody.style.display = 'block';
    } else {
        panelBody.style.display = 'none';
    }
    
    // Toggle rotation of the icon
    if (panelIcon.style.transform === 'rotate(180deg)') {
        panelIcon.style.transform = 'rotate(0deg)';
    } else {
        panelIcon.style.transform = 'rotate(180deg)';
    }
});

document.getElementById('aufgaben-Basisdienst').addEventListener('click', function() {
    var panelBody = document.getElementById('aufgaben-Basisdienst-panel-body');
    var panelIcon = document.getElementById('aufgaben-Basisdienst-panel-icon');
    
    // Toggle display of the panel body
    if (panelBody.style.display === 'none' || panelBody.style.display === '') {
        panelBody.style.display = 'block';
    } else {
        panelBody.style.display = 'none';
    }
    
    // Toggle rotation of the icon
    if (panelIcon.style.transform === 'rotate(180deg)') {
        panelIcon.style.transform = 'rotate(0deg)';
    } else {
        panelIcon.style.transform = 'rotate(180deg)';
    }
});

document.getElementById('aufgaben-Therapeutischerdienst').addEventListener('click', function() {
    var panelBody = document.getElementById('aufgaben-Therapeutischerdienst-panel-body');
    var panelIcon = document.getElementById('aufgaben-Therapeutischerdienst-panel-icon');
    
    // Toggle display of the panel body
    if (panelBody.style.display === 'none' || panelBody.style.display === '') {
        panelBody.style.display = 'block';
    } else {
        panelBody.style.display = 'none';
    }
    
    // Toggle rotation of the icon
    if (panelIcon.style.transform === 'rotate(180deg)') {
        panelIcon.style.transform = 'rotate(0deg)';
    } else {
        panelIcon.style.transform = 'rotate(180deg)';
    }
});