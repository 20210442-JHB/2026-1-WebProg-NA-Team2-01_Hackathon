        function submitFB() {
            const text = document.getElementById('fbInput').value;
            if(!text) return alert("내용을 입력하세요.");

            const feedbacks = JSON.parse(localStorage.getItem('feedbacks')) || [];
            feedbacks.push({ id: Date.now(), text: text, likes: 0 });
            localStorage.setItem('feedbacks', JSON.stringify(feedbacks));
            
            document.getElementById('fbInput').value = '';
            render();
        }

        function addLike(id) {
            let feedbacks = JSON.parse(localStorage.getItem('feedbacks')) || [];
            const target = feedbacks.find(f => f.id === id);
            if(target) {
                target.likes += 1;
                localStorage.setItem('feedbacks', JSON.stringify(feedbacks));
                render();
            }
        }

        function render() {
            const listArr = JSON.parse(localStorage.getItem('feedbacks')) || [];
            const listDiv = document.getElementById('studentList');
            listDiv.innerHTML = '';
            listArr.reverse().forEach(item => {
                const div = document.createElement('div');
                div.className = 'item';
                div.innerHTML = `
                    <span>${item.text}</span>
                    <button class="like-btn" onclick="addLike(${item.id})"> ${item.likes}</button>
                `;
                listDiv.appendChild(div);
            });
        }

        window.addEventListener('storage', render);
        window.onload = render;


                function loadFeedbacks() {
            const listArr = JSON.parse(localStorage.getItem('feedbacks')) || [];
            const listDiv = document.getElementById('adminList');
            listDiv.innerHTML = '';

            listArr.sort((a, b) => b.likes - a.likes);

            listArr.forEach(item => {
                const div = document.createElement('div');
                div.className = 'feedback-item';
                div.innerHTML = `
                    <div class="info">
                        <span class="likes-badge">👍 ${item.likes}</span>
                        <span style="margin-left:10px">${item.text}</span>
                    </div>
                    <button class="del-btn" onclick="deleteFeedback(${item.id})">삭제</button>
                `;
                listDiv.appendChild(div);
            });
        }

        function deleteFeedback(id) {
            if(confirm("이 피드백을 삭제하시겠습니까?")) {
                let listArr = JSON.parse(localStorage.getItem('feedbacks')) || [];
                listArr = listArr.filter(item => item.id !== id);
                localStorage.setItem('feedbacks', JSON.stringify(listArr));
                loadFeedbacks(); 
            }
        }

        window.addEventListener('storage', loadFeedbacks);
        window.onload = loadFeedbacks;
