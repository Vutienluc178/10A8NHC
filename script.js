// Sample data for reports
const studentsData = [
    {
        id: 1,
        name: 'Nguyễn Văn An',
        studentId: '001',
        birthdate: '2008-03-15',
        gender: 'Nam',
        address: 'Hà Nội',
        parentName: 'Nguyễn Văn Bình',
        parentPhone: '0987654321',
        parentEmail: 'nguyenvanbinhphu@email.com',
        grades: {
            math: [8.5, 9.0, 8.8],
            literature: [8.0, 8.5, 8.2],
            english: [7.5, 8.0, 7.8],
            physics: [8.0, 8.5, 8.3],
            chemistry: [7.5, 8.0, 7.8]
        },
        disciplineScore: 9.5,
        violations: [
            { type: 'late', severity: 'light', date: '2024-01-10', points: -0.5 }
        ],
        rewards: [
            { type: 'homework_excellent', level: 'very_good', date: '2024-01-15', points: 1 }
        ],
        attendanceStats: { present: 48, absent: 2, late: 1, excused: 0, rate: 94.1 },
        communicationStats: { sent: 8, received: 6, responseRate: 75, lastContact: '2024-01-20' }
    },
    {
        id: 2,
        name: 'Trần Thị Bình',
        studentId: '002',
        birthdate: '2008-07-22',
        gender: 'Nữ',
        address: 'Hồ Chí Minh',
        parentName: 'Trần Văn Cường',
        parentPhone: '0912345678',
        parentEmail: 'tranvancuong@email.com',
        grades: {
            math: [7.0, 7.5, 6.8],
            literature: [8.0, 7.5, 7.8],
            english: [6.5, 7.0, 6.2],
            physics: [7.0, 6.5, 6.8],
            chemistry: [6.5, 7.0, 6.8]
        },
        disciplineScore: 7.0,
        violations: [
            { type: 'late', severity: 'light', date: '2024-01-08', points: -0.5 },
            { type: 'homework', severity: 'medium', date: '2024-01-12', points: -1 }
        ],
        rewards: [],
        attendanceStats: { present: 45, absent: 4, late: 2, excused: 0, rate: 88.2 },
        communicationStats: { sent: 12, received: 8, responseRate: 67, lastContact: '2024-01-18' }
    },
    {
        id: 3,
        name: 'Lê Văn Cường',
        studentId: '003',
        birthdate: '2008-11-10',
        gender: 'Nam',
        address: 'Đà Nẵng',
        parentName: 'Lê Thị Dung',
        parentPhone: '0923456789',
        parentEmail: 'lethidung@email.com',
        grades: {
            math: [9.0, 9.5, 9.2],
            literature: [8.5, 9.0, 8.8],
            english: [8.0, 8.5, 8.3],
            physics: [9.0, 8.5, 8.8],
            chemistry: [8.5, 9.0, 8.8]
        },
        disciplineScore: 10.0,
        violations: [],
        rewards: [
            { type: 'academic_achievement', level: 'excellent', date: '2024-01-05', points: 2 },
            { type: 'help_classmates', level: 'good', date: '2024-01-12', points: 0.5 }
        ],
        attendanceStats: { present: 51, absent: 0, late: 0, excused: 0, rate: 100 },
        communicationStats: { sent: 4, received: 4, responseRate: 100, lastContact: '2024-01-15' }
    }
];

// Chart instances
let academicChart, attendanceChart, distributionChart, disciplineChart;

// Initialize the reports page
document.addEventListener('DOMContentLoaded', function() {
    initializeReports();
    setDefaultDates();
    updateReportData();
});

function initializeReports() {
    // Set report generated date
    document.getElementById('reportGeneratedDate').textContent = 
        'Ngày tạo báo cáo: ' + new Date().toLocaleDateString('vi-VN');
    
    // Populate individual student select
    populateIndividualStudentSelect();
    
    // Initialize charts
    initializeCharts();
    
    // Load all report data
    loadReportData();
}

function setDefaultDates() {
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    
    document.getElementById('reportStartDate').value = startOfMonth.toISOString().split('T')[0];
    document.getElementById('reportEndDate').value = today.toISOString().split('T')[0];
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
    // Academic Performance Chart
    const academicCtx = document.getElementById('academicChart').getContext('2d');
    academicChart = new Chart(academicCtx, {
        type: 'bar',
        data: {
            labels: ['Toán', 'Văn', 'Anh', 'Lý', 'Hóa'],
            datasets: [{
                label: 'Điểm trung bình',
                data: [8.1, 8.0, 7.4, 7.8, 7.7],
                backgroundColor: [
                    'rgba(59, 130, 246, 0.8)',
                    'rgba(16, 185, 129, 0.8)',
                    'rgba(245, 158, 11, 0.8)',
                    'rgba(139, 92, 246, 0.8)',
                    'rgba(239, 68, 68, 0.8)'
                ],
                borderColor: [
                    'rgb(59, 130, 246)',
                    'rgb(16, 185, 129)',
                    'rgb(245, 158, 11)',
                    'rgb(139, 92, 246)',
                    'rgb(239, 68, 68)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 10
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });

    // Attendance Trend Chart
    const attendanceCtx = document.getElementById('attendanceChart').getContext('2d');
    attendanceChart = new Chart(attendanceCtx, {
        type: 'line',
        data: {
            labels: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'],
            datasets: [{
                label: 'Tỷ lệ có mặt (%)',
                data: [95, 92, 96, 94, 90, 88, 85],
                borderColor: 'rgb(16, 185, 129)',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });

    // Grade Distribution Chart
    const distributionCtx = document.getElementById('distributionChart').getContext('2d');
    distributionChart = new Chart(distributionCtx, {
        type: 'doughnut',
        data: {
            labels: ['Xuất sắc (9-10)', 'Giỏi (8-8.9)', 'Khá (6.5-7.9)', 'Trung bình (5-6.4)', 'Yếu (<5)'],
            datasets: [{
                data: [8, 12, 10, 4, 1],
                backgroundColor: [
                    'rgba(34, 197, 94, 0.8)',
                    'rgba(59, 130, 246, 0.8)',
                    'rgba(245, 158, 11, 0.8)',
                    'rgba(249, 115, 22, 0.8)',
                    'rgba(239, 68, 68, 0.8)'
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });

    // Discipline Overview Chart
    const disciplineCtx = document.getElementById('disciplineChart').getContext('2d');
    disciplineChart = new Chart(disciplineCtx, {
        type: 'bar',
        data: {
            labels: ['Xuất sắc', 'Tốt', 'Khá', 'Trung bình', 'Yếu'],
            datasets: [{
                label: 'Số học sinh',
                data: [15, 12, 6, 2, 0],
                backgroundColor: 'rgba(139, 92, 246, 0.8)',
                borderColor: 'rgb(139, 92, 246)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}

function loadReportData() {
    loadTopPerformers();
    loadSupportNeeded();
    loadSubjectAnalysis();
    loadAttendanceAnalysis();
    loadCommunicationStats();
    loadRecommendations();
    updateMetrics();
}

function loadTopPerformers() {
    const tbody = document.getElementById('topPerformersTable');
    tbody.innerHTML = '';

    // Sort students by average grade
    const sortedStudents = studentsData
        .map(student => ({
            ...student,
            average: calculateAverage(student)
        }))
        .sort((a, b) => b.average - a.average)
        .slice(0, 5);

    sortedStudents.forEach((student, index) => {
        const row = document.createElement('tr');
        const rankIcon = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}`;
        
        row.innerHTML = `
            <td class="px-3 py-2 font-medium">${rankIcon}</td>
            <td class="px-3 py-2">${student.name}</td>
            <td class="px-3 py-2"><span class="font-bold text-green-600">${student.average.toFixed(1)}</span></td>
            <td class="px-3 py-2"><span class="font-bold text-blue-600">${student.disciplineScore}</span></td>
        `;
        tbody.appendChild(row);
    });
}

function loadSupportNeeded() {
    const tbody = document.getElementById('supportNeededTable');
    tbody.innerHTML = '';

    studentsData.forEach(student => {
        const average = calculateAverage(student);
        const issues = [];

        if (average < 5.0) issues.push({ type: 'Điểm số thấp', severity: 'high' });
        if (student.attendanceStats.rate < 85) issues.push({ type: 'Vắng học nhiều', severity: 'high' });
        if (student.disciplineScore < 7) issues.push({ type: 'Nề nếp kém', severity: 'medium' });
        if (student.violations.length > 2) issues.push({ type: 'Vi phạm nhiều', severity: 'medium' });

        issues.forEach(issue => {
            const row = document.createElement('tr');
            const severityClass = issue.severity === 'high' ? 'text-red-600' : 'text-orange-600';
            const severityText = issue.severity === 'high' ? 'Cao' : 'Trung bình';
            
            row.innerHTML = `
                <td class="px-3 py-2 font-medium">${student.name}</td>
                <td class="px-3 py-2">${issue.type}</td>
                <td class="px-3 py-2"><span class="${severityClass} font-medium">${severityText}</span></td>
                <td class="px-3 py-2">
                    <button class="text-blue-600 hover:text-blue-800 text-sm" onclick="createActionPlan(${student.id}, '${issue.type}')">
                        <i class="fas fa-plus mr-1"></i>Tạo kế hoạch
                    </button>
                </td>
            `;
            tbody.appendChild(row);
        });
    });
}

function loadSubjectAnalysis() {
    const tbody = document.getElementById('subjectAnalysisTable');
    tbody.innerHTML = '';

    const subjects = [
        { key: 'math', name: 'Toán học' },
        { key: 'literature', name: 'Ngữ văn' },
        { key: 'english', name: 'Tiếng Anh' },
        { key: 'physics', name: 'Vật lý' },
        { key: 'chemistry', name: 'Hóa học' }
    ];

    subjects.forEach(subject => {
        const subjectGrades = studentsData.flatMap(student => 
            student.grades[subject.key] || []
        );

        if (subjectGrades.length === 0) return;

        const average = subjectGrades.reduce((a, b) => a + b, 0) / subjectGrades.length;
        const highest = Math.max(...subjectGrades);
        const lowest = Math.min(...subjectGrades);
        const goodCount = subjectGrades.filter(grade => grade >= 8).length;
        const poorCount = subjectGrades.filter(grade => grade < 5).length;
        
        // Mock trend data
        const trends = ['up', 'down', 'stable'];
        const trend = trends[Math.floor(Math.random() * trends.length)];
        const trendIcon = trend === 'up' ? 'fas fa-arrow-up trend-up' : 
                        trend === 'down' ? 'fas fa-arrow-down trend-down' : 
                        'fas fa-minus trend-stable';

        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="px-4 py-3 font-medium">${subject.name}</td>
            <td class="px-4 py-3"><span class="font-bold text-blue-600">${average.toFixed(1)}</span></td>
            <td class="px-4 py-3"><span class="font-bold text-green-600">${highest}</span></td>
            <td class="px-4 py-3"><span class="font-bold text-red-600">${lowest}</span></td>
            <td class="px-4 py-3"><span class="font-bold text-green-600">${goodCount}</span></td>
            <td class="px-4 py-3"><span class="font-bold text-red-600">${poorCount}</span></td>
            <td class="px-4 py-3"><i class="${trendIcon}"></i></td>
        `;
        tbody.appendChild(row);
    });
}

function loadAttendanceAnalysis() {
    const tbody = document.getElementById('attendanceAnalysisTable');
    tbody.innerHTML = '';

    studentsData.forEach(student => {
        const stats = student.attendanceStats;
        const evaluation = stats.rate >= 95 ? 'Xuất sắc' : 
                         stats.rate >= 90 ? 'Tốt' : 
                         stats.rate >= 85 ? 'Khá' : 
                         stats.rate >= 80 ? 'Trung bình' : 'Yếu';
        
        const evaluationClass = stats.rate >= 95 ? 'text-green-600' : 
                               stats.rate >= 90 ? 'text-blue-600' : 
                               stats.rate >= 85 ? 'text-yellow-600' : 
                               stats.rate >= 80 ? 'text-orange-600' : 'text-red-600';

        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="px-4 py-3 font-medium">${student.name}</td>
            <td class="px-4 py-3"><span class="font-bold text-green-600">${stats.present}</span></td>
            <td class="px-4 py-3"><span class="font-bold text-red-600">${stats.absent}</span></td>
            <td class="px-4 py-3"><span class="font-bold text-yellow-600">${stats.late}</span></td>
            <td class="px-4 py-3"><span class="font-bold text-blue-600">${stats.excused}</span></td>
            <td class="px-4 py-3">
                <div class="flex items-center">
                    <div class="w-16 bg-gray-200 rounded-full h-2 mr-2">
                        <div class="bg-green-600 h-2 rounded-full progress-bar" style="width: ${stats.rate}%"></div>
                    </div>
                    <span class="text-sm font-medium">${stats.rate}%</span>
                </div>
            </td>
            <td class="px-4 py-3"><span class="${evaluationClass} font-medium">${evaluation}</span></td>
        `;
        tbody.appendChild(row);
    });
}

function loadCommunicationStats() {
    const tbody = document.getElementById('communicationStatsTable');
    tbody.innerHTML = '';

    studentsData.forEach(student => {
        const stats = student.communicationStats;
        const responseClass = stats.responseRate >= 80 ? 'text-green-600' : 
                             stats.responseRate >= 60 ? 'text-yellow-600' : 'text-red-600';

        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="px-4 py-3 font-medium">${student.parentName}</td>
            <td class="px-4 py-3">${student.name}</td>
            <td class="px-4 py-3"><span class="font-bold text-blue-600">${stats.sent}</span></td>
            <td class="px-4 py-3"><span class="font-bold text-green-600">${stats.received}</span></td>
            <td class="px-4 py-3"><span class="${responseClass} font-bold">${stats.responseRate}%</span></td>
            <td class="px-4 py-3 text-sm text-gray-600">${formatDate(stats.lastContact)}</td>
        `;
        tbody.appendChild(row);
    });
}

function loadRecommendations() {
    const strengthsList = document.getElementById('strengthsList');
    const improvementsList = document.getElementById('improvementsList');
    const actionPlanList = document.getElementById('actionPlanList');

    // Strengths
    const strengths = [
        'Điểm trung bình lớp đạt 7.8/10, cao hơn mức trung bình chung',
        'Có 8 học sinh đạt loại xuất sắc (điểm TB ≥ 9.0)',
        'Tỷ lệ có mặt trung bình đạt 94.2%, khá tốt',
        'Môn Toán có kết quả cao nhất với điểm TB 8.1',
        'Tỷ lệ phản hồi từ phụ huynh đạt 89%, rất tích cực'
    ];

    strengthsList.innerHTML = '';
    strengths.forEach(strength => {
        const li = document.createElement('li');
        li.className = 'flex items-start space-x-2';
        li.innerHTML = `
            <i class="fas fa-check-circle text-green-500 mt-1"></i>
            <span class="text-sm text-gray-700">${strength}</span>
        `;
        strengthsList.appendChild(li);
    });

    // Improvements
    const improvements = [
        'Cần cải thiện kết quả môn Tiếng Anh (TB: 7.4)',
        '4 học sinh có tỷ lệ vắng mặt > 10%',
        '2 học sinh có điểm trung bình < 6.0',
        'Cần tăng cường liên lạc với 3 phụ huynh ít phản hồi',
        'Giảm số vi phạm nề nếp (hiện có 8 trường hợp)'
    ];

    improvementsList.innerHTML = '';
    improvements.forEach(improvement => {
        const li = document.createElement('li');
        li.className = 'flex items-start space-x-2';
        li.innerHTML = `
            <i class="fas fa-exclamation-circle text-red-500 mt-1"></i>
            <span class="text-sm text-gray-700">${improvement}</span>
        `;
        improvementsList.appendChild(li);
    });

    // Action Plans
    const actionPlans = [
        {
            title: 'Cải thiện môn Tiếng Anh',
            description: 'Tổ chức lớp học phụ đạo, tăng cường bài tập thực hành',
            deadline: '2024-02-15',
            priority: 'high'
        },
        {
            title: 'Giảm tỷ lệ vắng mặt',
            description: 'Liên hệ trực tiếp với phụ huynh, theo dõi sát sao',
            deadline: '2024-02-01',
            priority: 'high'
        },
        {
            title: 'Hỗ trợ học sinh yếu kém',
            description: 'Lập kế hoạch học tập cá nhân, ghép đôi với bạn giỏi',
            deadline: '2024-02-10',
            priority: 'medium'
        }
    ];

    actionPlanList.innerHTML = '';
    actionPlans.forEach(plan => {
        const div = document.createElement('div');
        const priorityClass = plan.priority === 'high' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700';
        
        div.className = 'flex items-start justify-between p-3 bg-white rounded border';
        div.innerHTML = `
            <div class="flex-1">
                <div class="flex items-center space-x-2 mb-1">
                    <h5 class="font-medium">${plan.title}</h5>
                    <span class="${priorityClass} text-xs px-2 py-1 rounded-full">${plan.priority === 'high' ? 'Ưu tiên cao' : 'Ưu tiên trung bình'}</span>
                </div>
                <p class="text-sm text-gray-600 mb-2">${plan.description}</p>
                <p class="text-xs text-gray-500">Hạn: ${formatDate(plan.deadline)}</p>
            </div>
            <button class="text-blue-600 hover:text-blue-800 ml-4" onclick="assignTask('${plan.title}')">
                <i class="fas fa-user-plus"></i>
            </button>
        `;
        actionPlanList.appendChild(div);
    });
}

function updateMetrics() {
    // Update key metrics with animation
    animateNumber('totalStudentsMetric', 35);
    animateNumber('classAverageMetric', 7.8, 1);
    animateNumber('attendanceRateMetric', 94.2, 1, '%');
    animateNumber('disciplineAverageMetric', 8.7, 1);
}

function animateNumber(elementId, targetValue, decimals = 0, suffix = '') {
    const element = document.getElementById(elementId);
    const startValue = 0;
    const duration = 1000;
    const startTime = performance.now();

    function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const currentValue = startValue + (targetValue - startValue) * progress;
        
        element.textContent = currentValue.toFixed(decimals) + suffix;
        
        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        }
    }
    
    requestAnimationFrame(updateNumber);
}

// Chart manipulation functions
function toggleChartType(chartName) {
    let chart;
    switch(chartName) {
        case 'academic':
            chart = academicChart;
            chart.config.type = chart.config.type === 'bar' ? 'line' : 'bar';
            break;
        case 'attendance':
            chart = attendanceChart;
            chart.config.type = chart.config.type === 'line' ? 'bar' : 'line';
            break;
        case 'distribution':
            chart = distributionChart;
            chart.config.type = chart.config.type === 'doughnut' ? 'pie' : 'doughnut';
            break;
        case 'discipline':
            chart = disciplineChart;
            chart.config.type = chart.config.type === 'bar' ? 'horizontalBar' : 'bar';
            break;
    }
    chart.update();
    showSuccessToast('Đã thay đổi kiểu biểu đồ!');
}

function exportChart(chartId) {
    const canvas = document.getElementById(chartId);
    const url = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `${chartId}_${new Date().toISOString().split('T')[0]}.png`;
    link.href = url;
    link.click();
    showSuccessToast('Đã tải xuống biểu đồ!');
}

// Report generation functions
function updateReportData() {
    const reportType = document.getElementById('reportType').value;
    const period = document.getElementById('reportPeriod').value;
    
    // Update charts and tables based on selected filters
    loadReportData();
    showSuccessToast('Đã cập nhật dữ liệu báo cáo!');
}

function generateQuickReport(type) {
    let message = '';
    switch(type) {
        case 'top_students':
            message = 'Đã tạo báo cáo học sinh xuất sắc!';
            break;
        case 'low_performers':
            message = 'Đã tạo báo cáo học sinh cần hỗ trợ!';
            break;
        case 'attendance_issues':
            message = 'Đã tạo báo cáo vấn đề điểm danh!';
            break;
        case 'discipline_summary':
            message = 'Đã tạo tóm tắt nề nếp!';
            break;
        case 'parent_communication':
            message = 'Đã tạo báo cáo liên lạc phụ huynh!';
            break;
    }
    showSuccessToast(message);
}

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
                    <div class="flex justify-between">
                        <span>Họ tên:</span>
                        <span class="font-medium">${student.name}</span>
                    </div>
                    <div class="flex justify-between">
                        <span>Số báo danh:</span>
                        <span class="font-medium">${student.studentId}</span>
                    </div>
                    <div class="flex justify-between">
                        <span>Giới tính:</span>
                        <span class="font-medium">${student.gender}</span>
                    </div>
                    <div class="flex justify-between">
                        <span>Phụ huynh:</span>
                        <span class="font-medium">${student.parentName}</span>
                    </div>
                </div>
            </div>
            
            <div class="bg-green-50 rounded-lg p-4">
                <h4 class="font-semibold text-green-700 mb-3">Kết Quả Học Tập</h4>
                <div class="space-y-2 text-sm">
                    <div class="flex justify-between">
                        <span>Điểm TB:</span>
                        <span class="font-bold text-green-600">${average.toFixed(1)}</span>
                    </div>
                    <div class="flex justify-between">
                        <span>Xếp loại:</span>
                        <span class="font-medium">${getGradeClassification(average)}</span>
                    </div>
                    <div class="flex justify-between">
                        <span>Điểm nề nếp:</span>
                        <span class="font-bold text-blue-600">${student.disciplineScore}</span>
                    </div>
                    <div class="flex justify-between">
                        <span>Tỷ lệ có mặt:</span>
                        <span class="font-bold text-purple-600">${student.attendanceStats.rate}%</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <h4 class="font-semibold mb-3">Chi Tiết Điểm Số</h4>
                <div class="space-y-2">
                    ${Object.entries(student.grades).map(([subject, grades]) => {
                        const subjectName = getSubjectName(subject);
                        const avg = grades.length > 0 ? (grades.reduce((a, b) => a + b, 0) / grades.length).toFixed(1) : 'N/A';
                        return `
                            <div class="flex justify-between items-center p-2 bg-gray-50 rounded">
                                <span>${subjectName}:</span>
                                <span class="font-bold">${avg}</span>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
            
            <div>
                <h4 class="font-semibold mb-3">Thống Kê Khác</h4>
                <div class="space-y-2">
                    <div class="flex justify-between items-center p-2 bg-gray-50 rounded">
                        <span>Vi phạm:</span>
                        <span class="font-bold text-red-600">${student.violations.length}</span>
                    </div>
                    <div class="flex justify-between items-center p-2 bg-gray-50 rounded">
                        <span>Khen thưởng:</span>
                        <span class="font-bold text-green-600">${student.rewards.length}</span>
                    </div>
                    <div class="flex justify-between items-center p-2 bg-gray-50 rounded">
                        <span>Vắng mặt:</span>
                        <span class="font-bold text-orange-600">${student.attendanceStats.absent}</span>
                    </div>
                    <div class="flex justify-between items-center p-2 bg-gray-50 rounded">
                        <span>Tỷ lệ phản hồi PH:</span>
                        <span class="font-bold text-blue-600">${student.communicationStats.responseRate}%</span>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    content.classList.remove('hidden');
}

// Export functions
function exportToPDF() {
    showSuccessToast('Đang xuất báo cáo PDF... (Chức năng demo)');
    // In a real implementation, you would use a library like jsPDF
}

function exportToExcel() {
    showSuccessToast('Đang xuất báo cáo Excel... (Chức năng demo)');
    // In a real implementation, you would use a library like SheetJS
}

function printReport() {
    window.print();
}

function shareReport() {
    if (navigator.share) {
        navigator.share({
            title: 'Báo cáo lớp 10A1',
            text: 'Báo cáo tổng hợp lớp 10A1 - Trường THPT ABC',
            url: window.location.href
        });
    } else {
        // Fallback for browsers that don't support Web Share API
        const url = window.location.href;
        navigator.clipboard.writeText(url).then(() => {
            showSuccessToast('Đã sao chép liên kết báo cáo!');
        });
    }
}

// Utility functions
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

function getSubjectName(subject) {
    const names = {
        math: 'Toán',
        literature: 'Văn',
        english: 'Anh',
        physics: 'Lý',
        chemistry: 'Hóa'
    };
    return names[subject] || subject;
}

function getGradeClassification(average) {
    if (average >= 9) return 'Xuất sắc';
    if (average >= 8) return 'Giỏi';
    if (average >= 6.5) return 'Khá';
    if (average >= 5) return 'Trung bình';
    return 'Yếu';
}

function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('vi-VN');
}

function createActionPlan(studentId, issueType) {
    showSuccessToast(`Đã tạo kế hoạch hành động cho vấn đề: ${issueType}`);
}

function assignTask(taskTitle) {
    showSuccessToast(`Đã giao nhiệm vụ: ${taskTitle}`);
}

// Tab switching
function showTab(tabName) {
    // Hide all tabs
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => tab.classList.add('hidden'));
    
    // Show selected tab
    document.getElementById(tabName).classList.remove('hidden');
    
    // Update tab styles
    const navButtons = document.querySelectorAll('nav button');
    navButtons.forEach(btn => {
        btn.classList.remove('tab-active');
        btn.classList.add('text-gray-600', 'hover:text-blue-600');
    });
    
    event.currentTarget.classList.add('tab-active');
    event.currentTarget.classList.remove('text-gray-600', 'hover:text-blue-600');
}


// Success toast
function showSuccessToast(message) {
    const toast = document.getElementById('successToast');
    const messageElement = document.getElementById('successMessage');
    messageElement.textContent = message;
    toast.classList.remove('hidden');
    
    setTimeout(() => {
        toast.classList.add('hidden');
    }, 3000);
}

// Notifications
function showNotifications() {
    showSuccessToast('Chức năng thông báo sẽ được thêm trong phiên bản tiếp theo!');
}