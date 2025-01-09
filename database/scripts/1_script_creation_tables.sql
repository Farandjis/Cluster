-- Création de la table UTILISATEUR 
CREATE TABLE USERS (
    id_user INT AUTO_INCREMENT PRIMARY KEY,
    login VARCHAR(20) NOT NULL UNIQUE,
    role VARCHAR(50) NOT NULL,
    last_login_user_date DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    last_login_user_ip VARCHAR(15)
);

-- Création de la table HISTORY 
CREATE TABLE HISTORY (
    id_history INT PRIMARY KEY AUTO_INCREMENT,
    time TIMESTAMP NOT NULL,
    id_user INT NOT NULL,
    calcul TEXT NOT NULL,
    module VARCHAR(100) NOT NULL,
    CONSTRAINT constaint_user_history FOREIGN KEY (id_user) REFERENCES USERS(id_user) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Création de la table LOG_CONNECTION
CREATE TABLE LOG_CONNECTION (
    id_connection INT PRIMARY KEY AUTO_INCREMENT,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    login_tested VARCHAR(50),
    password_tested VARCHAR(100) NOT NULL
);
