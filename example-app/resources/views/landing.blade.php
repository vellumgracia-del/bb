<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>LibrAspire - Welcome</title>
    <link rel="stylesheet" href="{{ asset('css/style.css') }}">
    <style>
        .landing-container {
            text-align: center;
            margin-top: 100px;
        }
        .form-input {
            padding: 10px;
            width: 80%;
            max-width: 300px;
            border-radius: 10px;
            border: 2px solid #74503D;
            margin-top: 20px;
        }
        .submit-btn {
            background-color: #74503D;
            color: #BD9A73;
            padding: 10px 20px;
            border: none;
            border-radius: 10px;
            cursor: pointer;
            margin-top: 10px;
            font-weight: bold;
        }
        .submit-btn:hover {
            background-color: #2B1F19;
        }
    </style>
</head>
<body>

<div class="container landing-container">
    <h1>Selamat Datang di LibrAspire!</h1>
    <p>Sebelum kita mulai, bolehkah kami tahu nama Anda?</p>
    
    <form action="{{ url('/enter') }}" method="POST">
        @csrf
        <input type="text" name="name" class="form-input" placeholder="Masukkan nama Anda..." required autocomplete="off"><br>
        <button type="submit" class="submit-btn">Masuk</button>
    </form>
</div>

</body>
</html>
