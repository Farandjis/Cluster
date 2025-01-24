let sortDirections = new Map();

function sortTable(tableId, columnIndex) {
    const table = document.getElementById(tableId);
    const tbody = table.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));
    const headers = table.querySelectorAll('th');
    
    // Initialize sort direction for this table if needed
    if (!sortDirections.has(tableId)) {
        sortDirections.set(tableId, {});
    }
    const tableSort = sortDirections.get(tableId);
    
    // Toggle sort direction
    tableSort[columnIndex] = !tableSort[columnIndex];
    
    // Update arrows
    headers.forEach((header, index) => {
        const arrow = header.querySelector('.sort-arrow');
        if (arrow) {
            arrow.textContent = index === columnIndex 
                ? (tableSort[columnIndex] ? ' ↑' : ' ↓') 
                : ' ↕';
        }
    });

    // Sort rows
    const sortedRows = rows.sort((a, b) => {
        const aCol = a.querySelectorAll('td')[columnIndex].textContent.trim();
        const bCol = b.querySelectorAll('td')[columnIndex].textContent.trim();
        
        return tableSort[columnIndex] 
            ? aCol.localeCompare(bCol) 
            : bCol.localeCompare(aCol);
    });
    
    // Clear and repopulate table
    tbody.innerHTML = '';
    sortedRows.forEach(row => tbody.appendChild(row));
}
