<!DOCTYPE html>
<html>
	<head>
		<title> @yield('head.title') </title>
		@yield('head.meta')
		@yield('head.scripts')
		@yield('head.styles')
	</head>
	<body>
		@yield('body.content')
		@yield('body.styles')
		@yield('body.scripts')
	</body>
</html>