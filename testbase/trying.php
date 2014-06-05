<!DOCTYPE html>
<html>
	<head>
		<script type="text/javascript" src="../jquery.min.js"></script>
		<script type="text/javascript" src="../jquery.jqplot.min.js"></script>
		<script type="text/javascript" src="../plugins/jqplot.bubbleRenderer.min.js"></script>
		<link rel="stylesheet" type="text/css" hrf="../jquery.jqplot.min.css" />
		<script class="include" type="text/javascript" src="../plugins/jqplot.bubbleRenderer.min.js"></script>
	</head>
	<body>

	<?php
	$mysqli = new mysqli("192.254.236.167", "candm_happgov", "happygov1!", "candm_happygov", 3306);
	if ($mysqli->connect_errno) {
		echo "Failed to connect to MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
	}
	echo $mysqli->host_info . "\n";

	?>




	<?php
	$mysqli->real_query("SELECT count(*) as count FROM happy_gov");
	$res = $mysqli->use_result();

	echo "\n";
	echo "Result count...\n";
	while ($row = $res->fetch_assoc()) {
		echo " count = " . $row['count'] . "\n";
	}
	?>


	<ul>
	<li>Coffee</li>
	<li>Milk</li>
	</ul>





	</body>
</html>