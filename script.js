// Khai báo biến toàn cục
let studentsData = [];
let academicChart, attendanceChart, distributionChart, disciplineChart;

// --- KHỞI TẠO KHI TẢI TRANG ---
document.addEventListener('DOMContentLoaded', function() {
    loadStudentsFromStorage(); // Tải dữ liệu từ localStorage
    initializeReports();
    initializeStudentForm();
    renderStudentList(); // Hiển thị danh sách học sinh ban đầu
    setDefaultDates();
});

// --- QUẢN LÝ DỮ LIỆU HỌC SINH ---

function loadStudentsFromStorage() {
    const savedData = localStorage.getItem('studentsData');
    // Dữ liệu mẫu nếu localStorage trống
    const sampleData = [
        { id: 1, studentId: '001', name: 'Nguyễn Văn An', dob: '2008-03-15', gender: 'Nam', parentName: 'Nguyễn Văn Bình', parentPhone: '0987654321', grades: { math: [8.5, 9.0, 8.8], literature: [8.0, 8.5, 8.2], english: [7.5, 8.0, 7.8] }, disciplineScore: 9.5, attendanceStats: { present: 48, absent: 2, late: 1, excused: 0, rate: 94.1 }, communicationStats: { sent: 8, received: 6, responseRate: 75, lastContact: '2024-01-20' } },
        { id: 2, studentId: '002', name: 'Trần Thị Bình', dob: '2008-07-22', gender: 'Nữ', parentName: 'Trần Văn Cường', parentPhone: '0912345678', grades: { math: [7.0, 7.5, 6.8], literature: [8.0, 7.5, 7.8], english: [6.5, 7.0, 6.2] }, disciplineScore: 7.0, attendanceStats: { present: 45, absent: 4, late: 2, excused: 0, rate: 88.2 }, communicationStats: { sent: 12, received: 8, responseRate: 67, lastContact: '2024-01-18' } },
        { id: 3, studentId: '003', name: 'Lê Văn Cường', dob: '2008-11-10', gender: 'Nam', parentName: 'Lê Thị Dung', parentPhone: '0923456789', grades: { math: [9.0, 9.5, 9.2], literature: [8.5, 9.0, 8.8], english: [8.0, 8.5, 8.3] }, disciplineScore: 10.0, attendanceStats: { present: 51, absent: 0, late: 0, excused: 0, rate: 100 }, communicationStats: { sent: 4, received: 4, responseRate: 100, lastContact: '2024-01-15' } }
    ];
    studentsData = savedData ? JSON.parse(savedData) : sampleData;
}

function saveStudentsToStorage() {
    localStorage.setItem('studentsData', JSON.stringify(studentsData));
}

function refreshAllData() {
    renderStudentList();
    loadReportData();
    populateIndividualStudentSelect();
}

// --- TAB DANH SÁCH HỌC SINH ---

function initializeStudentForm() {
    const form = document.getElementById('student-form');
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const newStudent = {
            id: Date.now(), // Tạo ID duy nhất bằng timestamp
            studentId: document.getElementById('student-id').value,
            name: document.getElementById('student-name').value,
            dob: document.getElementById('student-dob').value,
            gender: document.getElementById('student-gender').value,
            parentName: document.getElementById('parent-name').value,
            parentPhone: document.getElementById('parent-phone').value,
            // Thêm các dữ liệu mặc định
            grades: { math: [], literature: [], english: [], physics: [], chemistry: [] },
            disciplineScore: 10.0,
            attendanceStats: { present: 0, absent: 0, late: 0, excused: 0, rate: 100 },
            communicationStats: { sent: 0, received: 0, responseRate: 0, lastContact: '' }
        };

        studentsData.push(newStudent);
        saveStudentsToStorage();
        refreshAllData();
        
        form.reset();
        showSuccessToast('Đã thêm học sinh thành công!');
    });
}

function renderStudentList() {
    const container = document.getElementById('student-list-container');
    const countEl = document.getElementById('student-count');
    container.innerHTML = '';
    countEl.textContent = studentsData.length;

    if (studentsData.length === 0) {
        container.innerHTML = `<p class="text-gray-500 text-center">Chưa có học sinh nào trong danh sách.</p>`;
        return;
    }

    studentsData.forEach(student => {
        const studentEl = document.createElement('div');
        studentEl.className = 'student-list-item';
        const nameInitial = student.name.charAt(0).toUpperCase();

        studentEl.innerHTML = `
            <div class="student-info">
                <div class="student-avatar">${nameInitial}</div>
                <div>
                    <p class="font-semibold text-gray-800">${student.name}</p>
                    <p class="text-sm text-gray-500">MHS: ${student.studentId} - Giới tính: ${student.gender}</p>
                </div>
            </div>
            <div class="student-actions">
                <button onclick="deleteStudent(${student.id})" title="Xóa học sinh">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </div>
        `;
        container.appendChild(studentEl);
    });
}

function deleteStudent(studentId) {
    if (confirm('Bạn có chắc chắn muốn xóa học sinh này không? Mọi dữ liệu liên quan sẽ bị mất.')) {
        studentsData = studentsData.filter(s => s.id !== studentId);
        saveStudentsToStorage();
        refreshAllData();
        showSuccessToast('Đã xóa học sinh thành công!');
    }
}

// --- TAB BÁO CÁO & THỐNG KÊ ---

function initializeReports() {
    document.getElementById('reportGeneratedDate').textContent = 'Ngày tạo báo cáo: ' + new Date().toLocaleDateString('vi-VN');
    populateIndividualStudentSelect();
    initializeCharts();
    loadReportData();
}

function setDefaultDates() {
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    
    document.getElementById('reportStartDate').valueAsDate = startOfMonth;
    document.getElementById('reportEndDate').valueAsDate = today;
}

function populateIndividualStudentSelect() {
    const select = document.getElementById('individualStudentSelect');
    select.innerHTML = '<option value="">Chọn học sinh</option>';
    studentsData.forEach(student => {
        const option = document.createElement('option');
        option.value = student.id;
        option.textContent = `${student.name} (${student.studentId})`;
        select.appendChild(option);
    });
}

function initializeCharts() {
    // ... (Giữ nguyên toàn bộ code của hàm initializeCharts từ file cũ)
    // Academic Performance Chart
    const academicCtx = document.getElementById('academicChart').getContext('2d');
    academicChart = new Chart(academicCtx, {
        type: 'bar',
        data: {
            labels: ['Toán', 'Văn', 'Anh', 'Lý', 'Hóa'],
            datasets: [{
                label: 'Điểm trung bình',
                data: [8.1, 8.0, 7.4, 7.8, 7.7],
                backgroundColor: [ 'rgba(59, 130, 246, 0.8)', 'rgba(16, 185, 129, 0.8)', 'rgba(245, 158, 11, 0.8)', 'rgba(139, 92, 246, 0.8)', 'rgba(239, 68, 68, 0.8)' ],
                borderColor: [ 'rgb(59, 130, 246)', 'rgb(16, 185, 129)', 'rgb(245, 158, 11)', 'rgb(139, 92, 246)', 'rgb(239, 68, 68)' ],
                borderWidth: 1
            }]
        },
        options: { responsive: true, maintainAspectRatio: false, scales: { y: { beginAtZero: true, max: 10 } }, plugins: { legend: { display: false } } }
    });
    // Attendance Trend Chart
    const attendanceCtx = document.getElementById('attendanceChart').getContext('2d');
    attendanceChart = new Chart(attendanceCtx, {
        type: 'line',
        data: {
            labels: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'],
            datasets: [{ label: 'Tỷ lệ có mặt (%)', data: [95, 92, 96, 94, 90, 88, 85], borderColor: 'rgb(16, 185, 129)', backgroundColor: 'rgba(16, 185, 129, 0.1)', tension: 0.4, fill: true }]
        },
        options: { responsive: true, maintainAspectRatio: false, scales: { y: { beginAtZero: true, max: 100 } } }
    });
    // Grade Distribution Chart
    const distributionCtx = document.getElementById('distributionChart').getContext('2d');
    distributionChart = new Chart(distributionCtx, {
        type: 'doughnut',
        data: {
            labels: ['Xuất sắc (9-10)', 'Giỏi (8-8.9)', 'Khá (6.5-7.9)', 'Trung bình (5-6.4)', 'Yếu (<5)'],
            datasets: [{ data: [8, 12, 10, 4, 1], backgroundColor: [ 'rgba(34, 197, 94, 0.8)', 'rgba(59, 130, 246, 0.8)', 'rgba(245, 158, 11, 0.8)', 'rgba(249, 115, 22, 0.8)', 'rgba(239, 68, 68, 0.8)' ] }]
        },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } }
    });
    // Discipline Overview Chart
    const disciplineCtx = document.getElementById('disciplineChart').getContext('2d');
    disciplineChart = new Chart(disciplineCtx, {
        type: 'bar',
        data: {
            labels: ['Xuất sắc', 'Tốt', 'Khá', 'Trung bình', 'Yếu'],
            datasets: [{ label: 'Số học sinh', data: [15, 12, 6, 2, 0], backgroundColor: 'rgba(139, 92, 246, 0.8)', borderColor: 'rgb(139, 92, 246)', borderWidth: 1 }]
        },
        options: { responsive: true, maintainAspectRatio: false, scales: { y: { beginAtZero: true } }, plugins: { legend: { display: false } } }
    });
}

function loadReportData() {
    // ... (Giữ nguyên toàn bộ code của các hàm load...Data từ file cũ, ví dụ: loadTopPerformers, loadSupportNeeded, ...)
    // Chỉ cần đảm bảo các hàm này sử dụng biến studentsData toàn cục
    if (studentsData.length === 0) return; // Không chạy nếu không có dữ liệu
    loadTopPerformers();
    loadSupportNeeded();
    loadSubjectAnalysis();
    loadAttendanceAnalysis();
    loadCommunicationStats();
    loadRecommendations();
    updateMetrics();
}

// ... (Giữ nguyên toàn bộ code của các hàm còn lại từ file cũ)
// loadTopPerformers, loadSupportNeeded, loadSubjectAnalysis, loadAttendanceAnalysis,
// loadCommunicationStats, loadRecommendations, updateMetrics, animateNumber,
// toggleChartType, exportChart, updateReportData, generateQuickReport,
// loadIndividualReport, exportToPDF, exportToExcel, printReport, shareReport,
// calculateAverage, getSubjectName, getGradeClassification, formatDate,
// createActionPlan, assignTask, showTab, showSuccessToast, showNotifications.

// Ví dụ một hàm được giữ lại:
function loadTopPerformers() {
    const tbody = document.getElementById('topPerformersTable');
    tbody.innerHTML = '';
    if (studentsData.length === 0) {
        tbody.innerHTML = `<tr><td colspan="4" class="text-center p-4 text-gray-500">Không có dữ liệu</td></tr>`;
        return;
    }
    const sortedStudents = studentsData.map(student => ({...student, average: calculateAverage(student)})).sort((a, b) => b.average - a.average).slice(0, 5);
    sortedStudents.forEach((student, index) => {
        const row = document.createElement('tr');
        const rankIcon = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}`;
        row.innerHTML = `<td class="px-3 py-2 font-medium">${rankIcon}</td><td class="px-3 py-2">${student.name}</td><td class="px-3 py-2"><span class="font-bold text-green-600">${student.average.toFixed(1)}</span></td><td class="px-3 py-2"><span class="font-bold text-blue-600">${student.disciplineScore}</span></td>`;
        tbody.appendChild(row);
    });
}
//... Và các hàm khác tương tự
// ... (Dán toàn bộ các hàm còn lại từ file script.js cũ của bạn vào đây)

// Hàm tính điểm trung bình
function calculateAverage(student) {
    const subjects = ['math', 'literature', 'english', 'physics', 'chemistry'];
    let totalGrades = 0;
    let subjectCount = 0;
    subjects.forEach(subject => {
        const grades = student.grades[subject] || [];
        if (grades.length > 0) {
            const avg = grades.reduce((a, b) => a + b, 0) / grades.length;
            totalGrades += avg;
            subjectCount++;
        }
    });
    return subjectCount > 0 ? totalGrades / subjectCount : 0;
}
// Hàm chuyển tab
function showTab(tabName, event) {
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => tab.classList.add('hidden'));
    document.getElementById(tabName).classList.remove('hidden');

    const navButtons = document.querySelectorAll('nav button');
    navButtons.forEach(btn => {
        btn.classList.remove('tab-active', 'text-blue-600');
        btn.classList.add('text-gray-600', 'hover:text-blue-600');
    });

    const clickedButton = event.currentTarget;
    clickedButton.classList.add('tab-active', 'text-blue-600');
    clickedButton.classList.remove('text-gray-600', 'hover:text-blue-600');
}

// Thông báo thành công
function showSuccessToast(message) {
    const toast = document.getElementById('successToast');
    const messageElement = document.getElementById('successMessage');
    messageElement.textContent = message;
    toast.classList.remove('hidden');
    setTimeout(() => {
        toast.classList.add('hidden');
    }, 3000);
}
// Các hàm khác như loadSupportNeeded, loadSubjectAnalysis, v.v. cần được dán vào đây
function loadSupportNeeded() {
    const tbody = document.getElementById('supportNeededTable');
    tbody.innerHTML = '';
    if (studentsData.length === 0) {
        tbody.innerHTML = `<tr><td colspan="4" class="text-center p-4 text-gray-500">Không có dữ liệu</td></tr>`;
        return;
    }

    const supportList = studentsData.filter(student => calculateAverage(student) < 6.5 || student.disciplineScore < 7 || student.attendanceStats.rate < 90);

    supportList.forEach(student => {
        const average = calculateAverage(student);
        const issues = [];
        if (average < 6.5) issues.push({ type: 'Điểm số thấp', severity: 'high' });
        if (student.attendanceStats.rate < 90) issues.push({ type: 'Vắng học nhiều', severity: 'medium' });
        if (student.disciplineScore < 7) issues.push({ type: 'Nề nếp kém', severity: 'medium' });
        
        const row = document.createElement('tr');
        const severityClass = issues[0].severity === 'high' ? 'text-red-600' : 'text-orange-600';
        const severityText = issues[0].severity === 'high' ? 'Cao' : 'Trung bình';
        
        row.innerHTML = `<td class="px-3 py-2 font-medium">${student.name}</td><td class="px-3 py-2">${issues.map(i => i.type).join(', ')}</td><td class="px-3 py-2"><span class="${severityClass} font-medium">${severityText}</span></td><td class="px-3 py-2"><button class="text-blue-600 hover:text-blue-800 text-sm" onclick="createActionPlan(${student.id}, '${issues[0].type}')"><i class="fas fa-plus mr-1"></i>Tạo kế hoạch</button></td>`;
        tbody.appendChild(row);
    });
}
//... dán tiếp các hàm còn lại
function loadIndividualReport() {
    const studentId = parseInt(document.getElementById('individualStudentSelect').value);
    const content = document.getElementById('individualReportContent');
    if (!studentId) {
        content.classList.add('hidden');
        return;
    }
    const student = studentsData.find(s => s.id === studentId);
    if (!student) return;
    const average = calculateAverage(student);
    content.innerHTML = `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div class="bg-blue-50 rounded-lg p-4">
                <h4 class="font-semibold text-blue-700 mb-3">Thông Tin Cơ Bản</h4>
                <div class="space-y-2 text-sm">
                    <div class="flex justify-between"><span>Họ tên:</span><span class="font-medium">${student.name}</span></div>
                    <div class="flex justify-between"><span>Số báo danh:</span><span class="font-medium">${student.studentId}</span></div>
                    <div class="flex justify-between"><span>Giới tính:</span><span class="font-medium">${student.gender}</span></div>
                    <div class="flex justify-between"><span>Phụ huynh:</span><span class="font-medium">${student.parentName}</span></div>
                </div>
            </div>
            <div class="bg-green-50 rounded-lg p-4">
                <h4 class="font-semibold text-green-700 mb-3">Kết Quả Học Tập</h4>
                <div class="space-y-2 text-sm">
                    <div class="flex justify-between"><span>Điểm TB:</span><span class="font-bold text-green-600">${average.toFixed(1)}</span></div>
                    <div class="flex justify-between"><span>Xếp loại:</span><span class="font-medium">${getGradeClassification(average)}</span></div>
                    <div class="flex justify-between"><span>Điểm nề nếp:</span><span class="font-bold text-blue-600">${student.disciplineScore}</span></div>
                    <div class="flex justify-between"><span>Tỷ lệ có mặt:</span><span class="font-bold text-purple-600">${student.attendanceStats.rate}%</span></div>
                </div>
            </div>
        </div>`;
    content.classList.remove('hidden');
}
function getGradeClassification(average) { if (average >= 9) return 'Xuất sắc'; if (average >= 8) return 'Giỏi'; if (average >= 6.5) return 'Khá'; if (average >= 5) return 'Trung bình'; return 'Yếu'; }
function createActionPlan(studentId, issueType) { showSuccessToast(`Đã tạo kế hoạch hành động cho vấn đề: ${issueType}`); }
function updateReportData() { loadReportData(); showSuccessToast('Đã cập nhật dữ liệu báo cáo!'); }
