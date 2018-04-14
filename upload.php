<?php
header('Content-Type: application/json');

$uploaded = [];
$allowed = ['jpg'];

$succeded = [];
$failed = [];

$gameName;

if(!empty($_FILES['file']))
{
	foreach($_FILES['file']['name'] as $key => $name)
	{
		if($key === 0)
		{		
			$gameName = explode('.', $name)[0];
			
			if (!file_exists($gameName)) {
				mkdir($gameName, 0777, true);
			}
			$temp = $_FILES['file']['tmp_name'][$key];
			$file = explode('.', $name)[1] . '.' . explode('.', $name)[2];
			echo $file;
			if(move_uploaded_file($temp, "{$gameName}/{$file}") === true)
			{				
				$succeded[] = array(
					'name' => $name,
					'file' => $file
				);
			}
			else
			{
				$failed[] = array(
					'name' => $name
				);				
			}
			continue;
		}
		if($_FILES['file']['error'][$key] === 0)
		{
			$temp = $_FILES['file']['tmp_name'][$key];
			$ext = explode('.', $name);
			if(count($ext) === 3)
			{
				if (!file_exists($ext[0])) {
					mkdir("$gameName/$ext[0]", 0777, true);
				}
				
				$file = $ext[1] . '.' . $ext[2];
				if(move_uploaded_file($temp, "{$gameName}/{$ext[0]}/{$file}") === true)
				{				
					$succeded[] = array(
						'name' => $name,
						'file' => $file
					);
				}
				else
				{
					$failed[] = array(
						'name' => $name
					);				
				}
			}
			else
			{		
				$file = $name;
				if(move_uploaded_file($temp, "{$gameName}/{$file}") === true)
				{				
					$succeded[] = array(
						'name' => $name,
						'file' => $file
					);
				}
				else
				{
					$failed[] = array(
						'name' => $name
					);				
				}
			}			
		}
	}
}

if(!empty($_POST['ajax'])){
	echo json_encode(array(
	'succeeded' => $succeded,
	'failed' => $failed
));
}
