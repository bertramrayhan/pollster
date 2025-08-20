<h1 align="center">Pollster 📊</h1>
<p align="center">A dynamic polling website built with PHP and MySQL.</p>

<div align="center">
  <div style="display: flex;flex-direction: column;">
    <img src="https://raw.githubusercontent.com/bertramrayhan/pollster/main/demo/authentication.png" width="300px" alt="Authentication Page"/>
    <p><b>Authentication Page</b></p>
  </div>
  
  <div style="display: flex;flex-direction: column;">
    <img src="https://raw.githubusercontent.com/bertramrayhan/pollster/main/demo/main-page.png" width="300px" alt="Main Page"/>
    <p><b>Main Page</b></p>
  </div>

  <div style="display: flex;flex-direction: column;">
    <img src="https://raw.githubusercontent.com/bertramrayhan/pollster/main/demo/poll-page.png" width="300px" alt="Polling Page"/>
    <p><b>Polling Page</b></p>
  </div>
</div>


## 💫 About This Project

Pollster is a web application that allows users to participate in polls and see the results. This project was a great learning experience in building dynamic, database-driven websites. It handles everything from fetching poll data from a MySQL database to processing user votes and displaying the results, all powered by PHP on the backend.



## ✨ Key Features

- ✅ **View Polls**: Displays a list of available polls from the database.
- 🗳️ **Cast a Vote**: Users can select an option and submit their vote.
- 📈 **See Results**: Shows the current vote count for each option in a poll.
- ⚙️ **Database-Driven**: All poll data, options, and votes are stored and managed in a MySQL database.

  


## 💻 Tech Stack

![PHP](https://img.shields.io/badge/php-%23777BB4.svg?style=for-the-badge&logo=php&logoColor=white )
![MySQL](https://img.shields.io/badge/mysql-4479A1.svg?style=for-the-badge&logo=mysql&logoColor=white )
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white ) 
![CSS3](https://img.shields.io/badge/CSS3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white )
![JavaScript](https://img.shields.io/badge/javascript-%23F7DF1E.svg?style=for-the-badge&logo=javascript&logoColor=black )

## 🚀 Getting Started

### Prerequisites

Before running this project, make sure you have the following installed:

- **PHP** 7.4 or higher
- **MySQL** 5.7 or higher  
- **Web Server** (Apache/Nginx) or PHP built-in server

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/bertramrayhan/pollster.git
   cd pollster
   ```

2. **Set up the database**
   - Create a new MySQL database
   - Configure your database connection by creating `php/secret.php`:
   ```php
   <?php
   $host = "localhost";
   $user = "your_username";
   $password = "your_password";
   $database = "your_database_name";
   ?>
   ```

3. **Run the application**
   ```bash
   # Using PHP built-in server
   php -S localhost:8000
   ```
   
   Then open your browser and navigate to `http://localhost:8000`

## 📖 Usage

1. **Authentication**: Start by creating an account or logging in
2. **Browse Polls**: View available polls on the dashboard
3. **Create Polls**: Use the "Create Poll" button to add new polls
4. **Vote**: Click on any poll to cast your vote
5. **View Results**: See real-time voting results with percentage breakdowns

## 📁 Project Structure

```
pollster/
├── assets/           # Static assets (CSS, JS, images)
│   ├── css/         # Stylesheets
│   └── js/          # JavaScript modules
├── demo/            # Demo screenshots
├── php/             # Backend PHP files
│   ├── controllers/ # Application controllers
│   ├── auth.php     # Authentication logic
│   ├── index.php    # Main API endpoint
│   └── koneksi.php  # Database connection
├── auth.html        # Login/Register page
├── dashboard.html   # Main dashboard
├── detailPoll.html  # Individual poll page
└── README.md        # This file
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Bertram** - [bertramrayhan](https://github.com/bertramrayhan)

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page or submit a pull request.
