<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require './phpmailer/Exception.php';
require './phpmailer/PHPMailer.php';
require './phpmailer/SMTP.php';

//логин пароль от smtp
$smtpLogin = '';
$smtpPassword = '';

//массив получателей
$emailsTo = [
	'',
];

//тема сообщения
$subject = 'Заявка на проект ITS';





if (!isset($_POST['mode']) || $_POST['mode'] !== 'mail-request' ){
	returnStatus(false);
}

if (isset($_POST['tel']) && $_POST['tel'] !== '' ){
	returnStatus(false);
}

$message = '';
if (isset($_POST['fio']) && !empty($_POST['fio'])){
	$message .= "<p>Имя: ". $_POST['fio'] . "</p>";
} else {
	returnStatus(false);
}

if (isset($_POST['contact']) && !empty($_POST['contact'])){
	$message .= "<p>Телефон: ". $_POST['contact'] . "</p>";
} else {
	returnStatus(false);
}

if (isset($_POST['pochta']) && !empty($_POST['pochta'])){
	$message .= "<p>Email: ". $_POST['pochta'] . "</p>";
} else {
	returnStatus(false);
}

if (isset($_POST['subjects']) && !empty($_POST['subjects']) && is_array($_POST['subjects'])){
	$message .= "<p>Задачи: ". implode(", ", $_POST['subjects']) . "</p>";
}
if (isset($_POST['sum']) && !empty($_POST['sum'])){
	$message .= "<p>Бюджет: ". $_POST['sum'] . "</p>";
}

try {
	$mail = new PHPMailer(true);
	$mail->isSMTP();
	$mail->CharSet = "UTF-8";
	$mail->Host       = 'smtp.mail.ru';
	$mail->SMTPAuth   = true;
	$mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
	$mail->Port = 465;
	$mail->Username   = $smtpLogin;
	$mail->Password   = $smtpPassword;

	$mail->setFrom($smtpLogin);

	foreach ($emailsTo as $email){
		$mail->addAddress($email);
	}

	$mail->isHTML(true);

	$mail->Subject = $subject;
	$mail->Body    = $message;

	$mail->send();

	returnStatus(true);
} catch (Exception $e) {
	returnStatus(false);
}


function returnStatus($status){
	echo json_encode(['status'=>$status], JSON_UNESCAPED_UNICODE);
	die;
}