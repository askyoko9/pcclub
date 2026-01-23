document.addEventListener('DOMContentLoaded', function() {
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    
    phoneInputs.forEach(input => {
        // Блокируем ввод букв и ненужных символов
        input.addEventListener('keypress', function(e) {
            // Разрешаем только цифры
            if (!/[0-9]/.test(e.key) && 
                !(e.key === '+' && this.value === '')) {
                e.preventDefault();
            }
        });
        
        // Обработка ввода
        input.addEventListener('input', function(e) {
            // Оставляем только цифры и плюс в начале
            let value = e.target.value;
            if (value.startsWith('+')) {
                value = '+' + value.substring(1).replace(/\D/g, '');
            } else {
                value = value.replace(/\D/g, '');
            }
            
            // Форматируем
            if (value.length > 0) {
                if (value.startsWith('8')) {
                    value = '7' + value.substring(1);
                }
                if (!value.startsWith('7')) {
                    value = '7' + value;
                }
                
                let formatted = '+7';
                if (value.length > 1) formatted += ` (${value.substring(1, 4)}`;
                if (value.length >= 4) formatted += `) ${value.substring(4, 7)}`;
                if (value.length >= 7) formatted += `-${value.substring(7, 9)}`;
                if (value.length >= 9) formatted += `-${value.substring(9, 11)}`;
                
                e.target.value = formatted;
            }
        });
        
        // Очищаем при фокусе, если только плюс
        input.addEventListener('focus', function() {
            if (this.value === '+7 (' || this.value === '+') {
                this.value = '';
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const emailInputs = document.querySelectorAll('input[type="email"]');
    const commonDomains = ['gmail.com', 'mail.ru', 'yandex.ru', 'yahoo.com', 'outlook.com', 'hotmail.com'];
    
    emailInputs.forEach(input => {
        // Обработка ввода
        input.addEventListener('input', function(e) {
            const value = e.target.value;
            
            // Базовые проверки и очистка
            validateAndCleanEmailInput(this, value);
        });
        
        // Автодополнение при потере фокуса, если есть @
        input.addEventListener('blur', function(e) {
            const value = e.target.value.trim();
            
            // Автодополнение домена
            if (value.includes('@') && !value.includes('.', value.indexOf('@'))) {
                // Пользователь ввел только локальную часть и @
                const localPart = value.substring(0, value.indexOf('@') + 1);
                
                // Проверяем, может пользователь начал вводить домен
                const afterAt = value.substring(value.indexOf('@') + 1).toLowerCase();
                
                if (afterAt.length > 0) {
                    // Ищем подходящий домен из commonDomains
                    const matchingDomain = commonDomains.find(domain => 
                        domain.startsWith(afterAt)
                    );
                    
                    if (matchingDomain) {
                        e.target.value = localPart + matchingDomain;
                    }
                }
            }
            
            // Проверка валидности
            if (value && !isValidEmail(value)) {
                this.classList.add('email-error');
            } else {
                this.classList.remove('email-error');
            }
        });
        
    });
    
    function validateAndCleanEmailInput(input, value) {
        // Удаляем пробелы
        value = value.replace(/\s/g, '');
        
        // Оставляем только один символ @
        const atCount = (value.match(/@/g) || []).length;
        if (atCount > 1) {
            const firstAt = value.indexOf('@');
            value = value.substring(0, firstAt + 1) + 
                   value.substring(firstAt + 1).replace(/@/g, '');
        }
        
        // Удаляем некорректные символы (разрешены только: буквы, цифры, . _ % + - @)
        value = value.replace(/[^a-zA-Z0-9._%+\-@]/g, '');
        
        // Удаляем точки и дефисы в начале
        if (value.startsWith('.') || value.startsWith('-') || value.startsWith('_')) {
            value = value.substring(1);
        }
        
        // Удаляем несколько точек или дефисов подряд
        value = value.replace(/\.{2,}/g, '.')
                     .replace(/\-{2,}/g, '-')
                     .replace(/_{2,}/g, '_');
        
        // Если есть @, удаляем точки/дефисы/подчеркивания прямо перед ним
        const atIndex = value.indexOf('@');
        if (atIndex > 0) {
            const beforeAt = value.substring(0, atIndex);
            const afterAt = value.substring(atIndex);
            
            // Удаляем точки/дефисы/подчеркивания в конце локальной части
            const cleanedBefore = beforeAt.replace(/[.\-_]+$/, '');
            value = cleanedBefore + afterAt;
            
            // Приводим локальную часть к нижнему регистру
            value = cleanedBefore.toLowerCase() + afterAt;
        }
        
        input.value = value;
        input.classList.remove('email-error');
    }
    
    function isValidEmail(email) {
        // Проверка по стандарту RFC 5322 (упрощенная)
        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        return emailRegex.test(email) && email.length <= 254;
    }
});