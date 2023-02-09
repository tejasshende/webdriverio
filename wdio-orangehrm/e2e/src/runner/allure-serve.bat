@echo off
@REM echo "Generating allure report from e2e\src\output\reports\allure-results dir"
cd e2e\src\output\reports\ && allure serve
@REM allure generate --clean e2e\src\output\reports\allure-results && allure open