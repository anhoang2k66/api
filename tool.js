import os
import requests
import time
import re
import json
import uuid
import random
import sys
from concurrent.futures import ThreadPoolExecutor
from datetime import datetime

ban = """
\033[1;95m╭─⋞─────────────────────────────────────────────────────╮
\033[1;31m         ██╗░░██╗░█████╗░██╗██╗░░░██╗░█████╗░
\033[1;32m         ██║░██╔╝██╔══██╗██║╚██╗░██╔╝██╔══██╗
\033[1;33m         █████═╝░███████║██║░╚████╔╝░██║░░██║
\033[1;34m         ██╔═██╗░██╔══██║██║░░╚██╔╝░░██║░░██║
\033[1;35m         ██║░╚██╗██║░░██║██║░░░██║░░░╚█████╔╝
\033[1;36m         ╚═╝░░╚═╝╚═╝░░╚═╝╚═╝░░░╚═╝░░░░╚════╝░
\033[1;37m Facebook : \033[1;32mhttps://facebook.com/dhannn.06
\033[1;37m Telegram : \033[1;32mhttps://t.me/sadboydev06
\033[1;37m Website  : \033[1;32mhttps://kaiyoteam.site
\033[1;95m╰─────────────────────────────────────────────────────⋟─╯ 
\033[1;37m────────────────────────────────────────────────────────────
"""

def banner():
    os.system("cls" if os.name == "nt" else "clear")
    for h in ban:
        sys.stdout.write(h)
        sys.stdout.flush()
        time.sleep(0.0003)   
    banner()

def show_maintenance_message():
    maintenance_message = "\033[1;39m~\033[0;31m[\033[1;34m⟨⟩\033[0;31m] \033[1;39m➩ \033[1;35mĐã update xong với các chức năng vip hơn không share liên hệ fb.com/dhannn.06"
    print(maintenance_message)

if __name__ == "__main__":
    show_maintenance_message()
