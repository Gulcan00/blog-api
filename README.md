# 📝 Full-Stack Blog Platform

A **multi-frontend blog system** powered by a shared **Express + Prisma backend** and protected with **JWT authentication**.
This project demonstrates separation of concerns between backend services and multiple frontend clients.


## 🧩 Overview

This project consists of **three apps**:

1. **Backend API (Node.js / Express)** – Handles data, authentication, and CRUD operations for posts, comments, and users.
2. **Public Blog Frontend** – Allows readers to view posts and leave comments.
3. **Admin Dashboard** – Used by the author to create, edit, publish, or delete posts and manage comments.


## ⚙️ Tech Stack

**Backend:** Node.js, Express, Prisma, JWT Authentication

**Frontend:** React

**Database:** PostgreSQL


## 🛠️ Core Features

### 🔐 Backend API

* RESTful routes for posts, comments, and users
* JWT-based authentication and authorization
* Prisma ORM models for scalable data handling
* Protected routes for author/admin access
* Publish/unpublish support for posts
* Comment moderation


### 💻 Public Blog Frontend

* Displays published posts with titles, dates, and comments
* Allows users to add comments (with optional name/email)


### 🧰 Admin Dashboard

* List of all posts with publish status
* Create, edit, or delete blog posts
* Toggle publish/unpublish states
* Manage and moderate comments


