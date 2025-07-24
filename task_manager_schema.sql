
-- יצירת טבלת משתמשים
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

-- יצירת טבלת קטגוריות
CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- יצירת טבלת משימות
CREATE TABLE tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    description VARCHAR(200) NOT NULL,
    due_date DATE NOT NULL,
    category_id INT,
    is_done BOOLEAN DEFAULT false,
    user_id INT NOT NULL,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- הכנסת משתמש לדוגמה
INSERT INTO users (username, password) VALUES ('demo', MD5('1234'));

-- הכנסת קטגוריה לדוגמה
INSERT INTO categories (name, user_id) VALUES ('לימודים', 1), ('קניות', 1);

-- הכנסת משימות לדוגמה
INSERT INTO tasks (description, due_date, category_id, is_done, user_id) VALUES
('לסיים שיעורי בית', '2025-07-24', 1, false, 1),
('לקנות חלב', '2025-07-24', 2, true, 1);
