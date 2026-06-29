// ============================================
// STUDENT DATABASE - COMPLETE APPLICATION
// ============================================

// ============================================
// 1. DATA LAYER
// ============================================

// Sample student data (10-15 realistic records)
const sampleStudents = [
    {
        id: 1,
        firstName: "Maria",
        lastName: "Garcia",
        email: "maria.garcia@university.edu",
        studentId: "S2024001",
        major: "Computer Science",
        year: "Junior",
        gpa: 3.8,
        enrollmentDate: "2024-09-01",
        courses: ["CS301", "MATH202", "ENG101"]
    },
    {
        id: 2,
        firstName: "James",
        lastName: "Chen",
        email: "james.chen@university.edu",
        studentId: "S2024002",
        major: "Engineering",
        year: "Senior",
        gpa: 3.5,
        enrollmentDate: "2023-09-01",
        courses: ["ME301", "PHY202", "MATH301"]
    },
    {
        id: 3,
        firstName: "Aisha",
        lastName: "Patel",
        email: "aisha.patel@university.edu",
        studentId: "S2024003",
        major: "Business",
        year: "Sophomore",
        gpa: 3.9,
        enrollmentDate: "2024-09-01",
        courses: ["BUS101", "ECO201", "MKT202"]
    },
    {
        id: 4,
        firstName: "Liam",
        lastName: "O'Brien",
        email: "liam.obrien@university.edu",
        studentId: "S2024004",
        major: "Arts",
        year: "Freshman",
        gpa: 3.2,
        enrollmentDate: "2025-01-15",
        courses: ["ART101", "HIS102", "ENG103"]
    },
    {
        id: 5,
        firstName: "Sophia",
        lastName: "Kim",
        email: "sophia.kim@university.edu",
        studentId: "S2024005",
        major: "Biology",
        year: "Graduate",
        gpa: 3.7,
        enrollmentDate: "2023-09-01",
        courses: ["BIO401", "CHEM402", "BIO403"]
    },
    {
        id: 6,
        firstName: "Ethan",
        lastName: "Rodriguez",
        email: "ethan.rodriguez@university.edu",
        studentId: "S2024006",
        major: "Computer Science",
        year: "Sophomore",
        gpa: 3.1,
        enrollmentDate: "2024-09-01",
        courses: ["CS201", "MATH201", "PHY101"]
    },
    {
        id: 7,
        firstName: "Olivia",
        lastName: "Wang",
        email: "olivia.wang@university.edu",
        studentId: "S2024007",
        major: "Mathematics",
        year: "Senior",
        gpa: 4.0,
        enrollmentDate: "2022-09-01",
        courses: ["MATH401", "STAT302", "MATH403"]
    },
    {
        id: 8,
        firstName: "Noah",
        lastName: "Smith",
        email: "noah.smith@university.edu",
        studentId: "S2024008",
        major: "Physics",
        year: "Junior",
        gpa: 3.4,
        enrollmentDate: "2024-01-15",
        courses: ["PHY301", "MATH302", "AST201"]
    },
    {
        id: 9,
        firstName: "Emma",
        lastName: "Brown",
        email: "emma.brown@university.edu",
        studentId: "S2024009",
        major: "Psychology",
        year: "Freshman",
        gpa: 2.9,
        enrollmentDate: "2025-01-15",
        courses: ["PSY101", "SOC102", "BIO101"]
    },
    {
        id: 10,
        firstName: "Mason",
        lastName: "Taylor",
        email: "mason.taylor@university.edu",
        studentId: "S2024010",
        major: "Economics",
        year: "Graduate",
        gpa: 3.6,
        enrollmentDate: "2023-09-01",
        courses: ["ECO501", "FIN502", "STAT503"]
    },
    {
        id: 11,
        firstName: "Isabella",
        lastName: "Martinez",
        email: "isabella.martinez@university.edu",
        studentId: "S2024011",
        major: "Engineering",
        year: "Junior",
        gpa: 3.3,
        enrollmentDate: "2024-09-01",
        courses: ["CE301", "EE302", "ME303"]
    },
    {
        id: 12,
        firstName: "Lucas",
        lastName: "Anderson",
        email: "lucas.anderson@university.edu",
        studentId: "S2024012",
        major: "English",
        year: "Sophomore",
        gpa: 3.0,
        enrollmentDate: "2024-09-01",
        courses: ["ENG201", "LIT202", "WRI203"]
    },
    {
        id: 13,
        firstName: "Mia",
        lastName: "Thompson",
        email: "mia.thompson@university.edu",
        studentId: "S2024013",
        major: "Biology",
        year: "Senior",
        gpa: 3.8,
        enrollmentDate: "2022-09-01",
        courses: ["BIO301", "CHEM302", "BIO303"]
    },
    {
        id: 14,
        firstName: "Elijah",
        lastName: "Davis",
        email: "elijah.davis@university.edu",
        studentId: "S2024014",
        major: "Computer Science",
        year: "Graduate",
        gpa: 3.9,
        enrollmentDate: "2023-09-01",
        courses: ["CS501", "AI502", "ML503"]
    },
    {
        id: 15,
        firstName: "Charlotte",
        lastName: "Wilson",
        email: "charlotte.wilson@university.edu",
        studentId: "S2024015",
        major: "Business",
        year: "Junior",
        gpa: 3.2,
        enrollmentDate: "2024-01-15",
        courses: ["FIN301", "MKT302", "BUS303"]
    }
];

// ============================================
// 2. STATE MANAGEMENT
// ============================================

let students = [];
let currentEditId = null;
let deleteTargetId = null;
let currentSort = { column: 'id', ascending: true };

// ============================================
// 3. STORAGE FUNCTIONS (localStorage)
// ============================================

function loadFromStorage() {
    const stored = localStorage.getItem('students');
    if (stored) {
        try {
            students = JSON.parse(stored);
            return true;
        } catch (e) {
            console.error('Error loading from storage:', e);
            return false;
        }
    }
    return false;
}

function saveToStorage() {
    try {
        localStorage.setItem('students', JSON.stringify(students));
    } catch (e) {
        console.error('Error saving to storage:', e);
    }
}

function initializeData() {
    if (!loadFromStorage() || students.length === 0) {
        students = JSON.parse(JSON.stringify(sampleStudents));
        saveToStorage();
    }
}

// ============================================
// 4. RENDER FUNCTIONS
// ============================================

function getFilteredAndSortedStudents() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase().trim();
    const filterYear = document.getElementById('filterYear').value;
    const filterMajor = document.getElementById('filterMajor').value;
    const filterGPA = parseFloat(document.getElementById('filterGPA').value);

    let filtered = students.filter(student => {
        // Search filter
        if (searchTerm) {
            const searchable = `${student.firstName} ${student.lastName} ${student.studentId} ${student.major}`.toLowerCase();
            if (!searchable.includes(searchTerm)) return false;
        }

        // Year filter
        if (filterYear && student.year !== filterYear) return false;

        // Major filter
        if (filterMajor && student.major !== filterMajor) return false;

        // GPA filter
        if (filterGPA && student.gpa < filterGPA) return false;

        return true;
    });

    // Sort
    const { column, ascending } = currentSort;
    filtered.sort((a, b) => {
        let valA = a[column];
        let valB = b[column];
        
        if (typeof valA === 'string') {
            valA = valA.toLowerCase();
            valB = valB.toLowerCase();
        }
        
        if (valA < valB) return ascending ? -1 : 1;
        if (valA > valB) return ascending ? 1 : -1;
        return 0;
    });

    return filtered;
}

function renderTable() {
    const tbody = document.getElementById('studentTableBody');
    const emptyState = document.getElementById('emptyState');
    const filteredStudents = getFilteredAndSortedStudents();
    
    // Update student count
    document.getElementById('studentCount').textContent = students.length;

    if (filteredStudents.length === 0) {
        tbody.innerHTML = '';
        emptyState.style.display = 'block';
        return;
    }

    emptyState.style.display = 'none';

    tbody.innerHTML = filteredStudents.map(student => `
        <tr>
            <td>${student.id}</td>
            <td>${escapeHtml(student.firstName)}</td>
            <td>${escapeHtml(student.lastName)}</td>
            <td>${escapeHtml(student.email)}</td>
            <td>${escapeHtml(student.studentId)}</td>
            <td>${escapeHtml(student.major)}</td>
            <td>${escapeHtml(student.year)}</td>
            <td>${student.gpa.toFixed(2)}</td>
            <td>${student.enrollmentDate}</td>
            <td>
                ${student.courses && student.courses.length > 0 
                    ? student.courses.map(c => `<span class="courses-tag">${escapeHtml(c)}</span>`).join('')
                    : '<span style="color: #95a5a6; font-size: 0.8rem;">No courses</span>'
                }
            </td>
            <td>
                <div class="action-buttons">
                    <button class="btn btn-edit" onclick="editStudent(${student.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-delete" onclick="confirmDelete(${student.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');

    updateSortIcons();
}

function updateSortIcons() {
    document.querySelectorAll('#studentTable th').forEach(th => {
        const col = th.dataset.sort;
        if (col) {
            const icon = th.querySelector('i');
            if (col === currentSort.column) {
                icon.className = `fas fa-sort-${currentSort.ascending ? 'up' : 'down'}`;
                icon.style.opacity = '1';
            } else {
                icon.className = 'fas fa-sort';
                icon.style.opacity = '0.4';
            }
        }
    });
}

function populateFilterOptions() {
    const majorSelect = document.getElementById('filterMajor');
    const majors = [...new Set(students.map(s => s.major))].sort();
    
    // Keep the "All Majors" option
    majorSelect.innerHTML = '<option value="">All Majors</option>';
    majors.forEach(major => {
        const option = document.createElement('option');
        option.value = major;
        option.textContent = major;
        majorSelect.appendChild(option);
    });
}

// ============================================
// 5. CRUD OPERATIONS
// ============================================

function addStudent(studentData) {
    const maxId = students.reduce((max, s) => Math.max(max, s.id), 0);
    const newStudent = {
        id: maxId + 1,
        ...studentData,
        courses: studentData.courses || []
    };
    students.push(newStudent);
    saveToStorage();
    populateFilterOptions();
    renderTable();
    return newStudent;
}

function updateStudent(id, updatedData) {
    const index = students.findIndex(s => s.id === id);
    if (index !== -1) {
        students[index] = { ...students[index], ...updatedData };
        saveToStorage();
        populateFilterOptions();
        renderTable();
        return students[index];
    }
    return null;
}

function deleteStudent(id) {
    students = students.filter(s => s.id !== id);
    saveToStorage();
    populateFilterOptions();
    renderTable();
}

// ============================================
// 6. EVENT HANDLERS
// ============================================

// Search input
document.getElementById('searchInput').addEventListener('input', renderTable);

// Filter selects
document.getElementById('filterYear').addEventListener('change', renderTable);
document.getElementById('filterMajor').addEventListener('change', renderTable);
document.getElementById('filterGPA').addEventListener('change', renderTable);

// Table sorting
document.querySelectorAll('#studentTable th[data-sort]').forEach(th => {
    th.addEventListener('click', () => {
        const column = th.dataset.sort;
        if (currentSort.column === column) {
            currentSort.ascending = !currentSort.ascending;
        } else {
            currentSort.column = column;
            currentSort.ascending = true;
        }
        renderTable();
    });
});

// Add Student button
document.getElementById('addStudentBtn').addEventListener('click', () => {
    openModal(null);
});

// Close modal buttons
document.getElementById('closeModalBtn').addEventListener('click', closeModal);
document.getElementById('cancelModalBtn').addEventListener('click', closeModal);

// Click outside modal to close
document.getElementById('studentModal').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closeModal();
});

// Form submit
document.getElementById('studentForm').addEventListener('submit', (e) => {
    e.preventDefault();
    saveStudent();
});

// Delete modal handlers
document.getElementById('closeDeleteModalBtn').addEventListener('click', closeDeleteModal);
document.getElementById('cancelDeleteBtn').addEventListener('click', closeDeleteModal);
document.getElementById('deleteModal').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closeDeleteModal();
});
document.getElementById('confirmDeleteBtn').addEventListener('click', () => {
    if (deleteTargetId !== null) {
        deleteStudent(deleteTargetId);
        closeDeleteModal();
    }
});

// Export CSV
document.getElementById('exportCSVBtn').addEventListener('click', exportCSV);

// Import CSV
document.getElementById('importCSVBtn').addEventListener('click', () => {
    document.getElementById('csvFileInput').click();
});
document.getElementById('csvFileInput').addEventListener('change', importCSV);

// ============================================
// 7. MODAL FUNCTIONS
// ============================================

function openModal(student) {
    const modal = document.getElementById('studentModal');
    const title = document.getElementById('modalTitle');
    const form = document.getElementById('studentForm');
    
    if (student) {
        title.textContent = 'Edit Student';
        document.getElementById('editId').value = student.id;
        document.getElementById('firstName').value = student.firstName;
        document.getElementById('lastName').value = student.lastName;
        document.getElementById('email').value = student.email;
        document.getElementById('studentId').value = student.studentId;
        document.getElementById('major').value = student.major;
        document.getElementById('year').value = student.year;
        document.getElementById('gpa').value = student.gpa;
        document.getElementById('enrollmentDate').value = student.enrollmentDate;
        document.getElementById('courses').value = (student.courses || []).join(', ');
        currentEditId = student.id;
    } else {
        title.textContent = 'Add New Student';
        form.reset();
        document.getElementById('editId').value = '';
        currentEditId = null;
    }
    
    modal.classList.add('active');
}

function closeModal() {
    document.getElementById('studentModal').classList.remove('active');
    document.getElementById('studentForm').reset();
    currentEditId = null;
}

function saveStudent() {
    const formData = {
        firstName: document.getElementById('firstName').value.trim(),
        lastName: document.getElementById('lastName').value.trim(),
        email: document.getElementById('email').value.trim(),
        studentId: document.getElementById('studentId').value.trim(),
        major: document.getElementById('major').value,
        year: document.getElementById('year').value,
        gpa: parseFloat(document.getElementById('gpa').value),
        enrollmentDate: document.getElementById('enrollmentDate').value,
        courses: document.getElementById('courses').value
            .split(',')
            .map(c => c.trim())
            .filter(c => c !== '')
    };

    // Validation
    if (!formData.firstName || !formData.lastName || !formData.email || 
        !formData.studentId || !formData.major || !formData.year || 
        isNaN(formData.gpa) || !formData.enrollmentDate) {
        alert('Please fill in all required fields (*)');
        return;
    }

    if (formData.gpa < 0 || formData.gpa > 4) {
        alert('GPA must be between 0.0 and 4.0');
        return;
    }

    if (!formData.email.includes('@')) {
        alert('Please enter a valid email address');
        return;
    }

    const editId = document.getElementById('editId').value;
    if (editId) {
        updateStudent(parseInt(editId), formData);
    } else {
        addStudent(formData);
    }
    
    closeModal();
}

// ============================================
// 8. DELETE FUNCTIONS
// ============================================

function confirmDelete(id) {
    const student = students.find(s => s.id === id);
    if (!student) return;
    
    deleteTargetId = id;
    document.getElementById('deleteStudentName').textContent = 
        `${student.firstName} ${student.lastName}`;
    document.getElementById('deleteModal').classList.add('active');
}

function closeDeleteModal() {
    document.getElementById('deleteModal').classList.remove('active');
    deleteTargetId = null;
}

// ============================================
// 9. EDIT FUNCTION (Global for onclick)
// ============================================

window.editStudent = function(id) {
    const student = students.find(s => s.id === id);
    if (student) {
        openModal(student);
    }
};

window.confirmDelete = function(id) {
    confirmDelete(id);
};

// ============================================
// 10. CSV EXPORT/IMPORT
// ============================================

function exportCSV() {
    if (students.length === 0) {
        alert('No student data to export.');
        return;
    }

    // Define CSV headers
    const headers = ['ID', 'FirstName', 'LastName', 'Email', 'StudentID', 'Major', 'Year', 'GPA', 'EnrollmentDate', 'Courses'];
    
    // Create CSV rows
    const rows = students.map(s => [
        s.id,
        s.firstName,
        s.lastName,
        s.email,
        s.studentId,
        s.major,
        s.year,
        s.gpa,
        s.enrollmentDate,
        (s.courses || []).join(';')
    ]);

    // Combine headers and rows
    const csvContent = [
        headers.join(','),
        ...rows.map(row => row.join(','))
    ].join('\n');

    // Download file
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `students_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
}

function importCSV(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const text = e.target.result;
            const lines = text.split('\n').filter(line => line.trim() !== '');
            if (lines.length < 2) {
                alert('CSV file must contain headers and at least one student record.');
                return;
            }

            // Parse headers
            const headers = lines[0].split(',').map(h => h.trim());
            const expectedHeaders = ['ID', 'FirstName', 'LastName', 'Email', 'StudentID', 'Major', 'Year', 'GPA', 'EnrollmentDate', 'Courses'];
            
            // Check if headers match (case insensitive)
            const headerMatch = expectedHeaders.every((h, i) => 
                headers[i] && headers[i].toLowerCase() === h.toLowerCase()
            );

            if (!headerMatch) {
                alert('CSV format does not match expected headers. Please use the export format.');
                return;
            }

            let importedCount = 0;
            let errorCount = 0;

            // Parse data rows
            for (let i = 1; i < lines.length; i++) {
                const values = lines[i].split(',').map(v => v.trim());
                if (values.length < 10) continue;

                try {
                    const student = {
                        firstName: values[1],
                        lastName: values[2],
                        email: values[3],
                        studentId: values[4],
                        major: values[5],
                        year: values[6],
                        gpa: parseFloat(values[7]),
                        enrollmentDate: values[8],
                        courses: values[9] ? values[9].split(';').map(c => c.trim()).filter(c => c !== '') : []
                    };

                    // Validate
                    if (!student.firstName || !student.lastName || !student.email || 
                        !student.studentId || !student.major || !student.year || 
                        isNaN(student.gpa) || !student.enrollmentDate) {
                        errorCount++;
                        continue;
                    }

                    if (student.gpa < 0 || student.gpa > 4) {
                        errorCount++;
                        continue;
                    }

                    if (!student.email.includes('@')) {
                        errorCount++;
                        continue;
                    }

                    addStudent(student);
                    importedCount++;
                } catch (err) {
                    errorCount++;
                }
            }

            alert(`Import complete!\n\n? Successfully imported: ${importedCount} students\n? Failed: ${errorCount}\n?? Total students: ${students.length}`);
            
            // Reset file input
            document.getElementById('csvFileInput').value = '';
            
        } catch (err) {
            alert('Error parsing CSV file. Please check the format.');
            console.error(err);
        }
    };
    reader.readAsText(file);
}

// ============================================
// 11. UTILITY FUNCTIONS
// ============================================

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ============================================
// 12. INITIALIZATION
// ============================================

function init() {
    initializeData();
    populateFilterOptions();
    renderTable();
}

// Start the application
init();

console.log('?? Student Database initialized successfully!');
console.log(`?? Total students: ${students.length}`);
console.log('?? Features: Add, Edit, Delete, Search, Filter, Sort, Export/Import CSV');