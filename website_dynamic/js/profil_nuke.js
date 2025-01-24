function nukeSelected() {
    const select = document.getElementById('userSelect');
    const userId = select.value;
    const selectedText = select.options[select.selectedIndex].text;
    
    const confirmMessage = userId === '' ? 
        'Are you sure you want to terminate ALL processes?' :
        `Are you sure you want to terminate processes for user ${selectedText}?`;
        
    if (confirm(confirmMessage)) {
        fetch(`/nuke_someone?userId=${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(() => {
            updateActiveUsers();
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to terminate process(es)');
        });
    }
}


function updateActiveUsers() {
    fetch('/active-processes')
        .then(response => response.json())
        .then(data => {
            const select = document.getElementById('userSelect');
            const options = select.getElementsByTagName('option');
            
            options[0].style.display = '';
            
            for (let i = 1; i < options.length; i++) {
                const userId = options[i].value;
                options[i].style.display = data.activeUsers.includes(userId) ? '' : 'none';
            }
        })
        .catch(error => console.error('Error fetching active processes:', error));
}




function filterUsers() {
    const input = document.getElementById('userSearch');
    const filter = input.value.toLowerCase();
    const select = document.getElementById('userSelect');
    const options = select.getElementsByTagName('option');

    for (let i = 1; i < options.length; i++) {
        const text = options[i].text.toLowerCase();
        if (options[i].style.display !== 'none') {
            options[i].style.display = text.includes(filter) ? '' : 'none';
        }
    }
}

