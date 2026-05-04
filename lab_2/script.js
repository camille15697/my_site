document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. Зберігання та вивід інформації про систему ---
    const userAgent = navigator.userAgent;
    localStorage.setItem("UserBrowserInfo", userAgent);
    
    const footerInfo = document.getElementById("os-browser-info");
    if (footerInfo) {
        footerInfo.innerText = `Інформація про систему: ${localStorage.getItem("UserBrowserInfo")}`;
    }

    // --- 2. Відображення коментарів (API) ---
    // ТУТ ЗАМІНИТИ 1 НА НОМЕР ВАРІАНТА
    const apiUrl = 'https://jsonplaceholder.typicode.com/posts/9/comments';
    const commentsList = document.getElementById("comments-list");

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            commentsList.innerHTML = ""; 
            
            data.forEach(comment => {
                const li = document.createElement("li");
                li.innerHTML = `<strong>${comment.email}</strong>: <br> ${comment.body}`;
                commentsList.appendChild(li);
            });
        })
        .catch(error => {
            commentsList.innerHTML = "<li>Помилка завантаження коментарів.</li>";
            console.error('Помилка:', error);
        });

    // --- 3. Модальне вікно (з'являється через 1 хв) ---
    const modal = document.getElementById("feedback-modal");
    const closeBtn = document.querySelector(".close-btn");

    function showModal() {
        modal.style.display = "block";
    }

    // 60000 мілісекунд = 1 хвилина
    setTimeout(showModal, 60000);

    closeBtn.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    // --- 4. Перемикач теми ---
    const themeToggleBtn = document.getElementById("theme-toggle");
    
    function setAutoTheme() {
        const currentHour = new Date().getHours();
        
        // Від 07:00 до 21:00 денна тема
        if (currentHour >= 7 && currentHour < 21) {
            document.body.classList.remove("dark-mode");
            themeToggleBtn.innerText = "Нічна тема";
        } else {
            document.body.classList.add("dark-mode");
            themeToggleBtn.innerText = "Денна тема";
        }
    }

    setAutoTheme();

    themeToggleBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        
        if (document.body.classList.contains("dark-mode")) {
            themeToggleBtn.innerText = "Денна тема";
        } else {
            themeToggleBtn.innerText = "Нічна тема";
        }
    });
});