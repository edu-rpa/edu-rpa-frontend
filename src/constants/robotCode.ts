const robotCode = `*** Settings ***
Activity_0pkjxtm - Open Browser
Activity_1536xo5 - Get Title Assign to Home
IF: Gateway_0sc92or
	Activity_1gusysf - Log Screen
	Activity_173a9c7 - Click "Dịch vụ Internet"
ELSE:
	Activity_0m9hqf4 - Log Screen
	IF: Gateway_12fobzq
		Activity_0p2itoz - Click "Thảo luận"
	ELSE:
		Activity_072vuzz - Break

	Activity_1az9oha - Click "Thảo luận"
	Activity_1juwgjw - Break

Activity_012ckfs - Close Browser`;

export default robotCode;
