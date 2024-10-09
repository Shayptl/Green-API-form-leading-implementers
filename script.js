    document.getElementById('showFormBtn').addEventListener('click', function() {
        document.getElementById('initialContent').style.display = 'none';
        document.getElementById('formContent').style.display = 'block';
    });

    document.getElementById('userForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const userName = document.getElementById('userName').value;
        const userPhone = document.getElementById('userPhone').value;
        const customerCount = document.getElementById('customerCount').value;
        const userNote = document.getElementById('userNote').value;

        // שליחה ל-webhook
        const webhookUrl = 'https://hook.integrator.boost.space/tzq8fgw1ohr94f9x2kjdungwb62g5kfy';

        fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: userName,
                phone: userPhone,
                customers: customerCount,
                note: userNote
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(() => {
            document.getElementById('formContent').style.display = 'none';
            document.getElementById('thankYouMessage').style.display = 'block';
            document.getElementById('userForm').reset();
            
            // הפעלת אנימציית הקונפטי
            var duration = 3 * 1000;
            var animationEnd = Date.now() + duration;
            var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

            function randomInRange(min, max) {
                return Math.random() * (max - min) + min;
            }

            var interval = setInterval(function() {
                var timeLeft = animationEnd - Date.now();

                if (timeLeft <= 0) {
                    return clearInterval(interval);
                }

                var particleCount = 30 * (timeLeft / duration);
                confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
                confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
            }, 250);
        })
        .catch((error) => {
            console.error('שגיאה בשליחה ל-webhook:', error);
            alert('אירעה שגיאה בשליחת הטופס. אנא נסה שוב מאוחר יותר.');
        });
    });

    document.getElementById('backToFormBtn').addEventListener('click', function() {
        document.getElementById('thankYouMessage').style.display = 'none';
        document.getElementById('formContent').style.display = 'block';
        document.getElementById('userForm').reset();
    });
