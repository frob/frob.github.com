---
title: Getting XDebug working with the Zed editor, starring Claude
date: "2026-01-05"
description: The Zed editor is one of the more interesting new projects in a long while. The only problem is I use PHP and Zed sucks at PHP. One thing that sucks is Xdebug support. I finally got Xdebug working with the help of Claude. Notice, however, that I didn't say Claude got Xdebug working.
slug: getting-xdebug-working-with-zed-starring-cloude
tags:
    - frontpage
---
# Zed IDE and Xdebug 

Below is my journey at getting XDebug working with Zed. I have attempted this several times. If I had a spare hour, I would see if I could get Xdebug working. It normally ended in a fail, but not this time.

## Why Zed

The Zed editor is one of the more interesting new projects in a long while. Zed is an editor that is built like a multiplayer video game. It was designed in the onset with multi-user chat and to allow for multiple users to edit files together. When AI began to gain traction, they realized that the AI could be another user and added the AI chat and agent to the editor. 

Zed is from the creators of Atom and is written in Rust. It is crazy fast. But, Zed isn't perfect.

The main problem is me. I mostly work in PHP and Zed sucks at PHP. One thing that sucks is Xdebug support. I have finally gotten Xdebug working. What follows is my conversation with Claude Sonnet 4.5 to get Xdebug working.

## Initial Question: Best AI-Enabled IDE for PHP

I started out asking about AI enabled IDEs. I wasn't originally planning on asking about Xdebug.

> **User:** What is the best AI enabled IDE for PHP

> **Assistant:** For PHP development with AI assistance, here are the strongest options:

> **PhpStorm with AI Assistant** is probably your best bet. It's the most PHP-focused IDE and JetBrains recently added their AI Assistant plugin, which provides context-aware code completion, refactoring suggestions, and chat-based coding help. PhpStorm already has excellent PHP-specific features like deep framework integration (Laravel, Symfony), advanced refactoring, and debugging tools.

> **Cursor** is gaining a lot of traction as an AI-first IDE. It's built on VS Code but designed from the ground up for AI pair programming. You get inline AI suggestions, the ability to chat with your codebase, and AI that understands your project context. For PHP specifically, you'd pair it with PHP extensions, but the AI capabilities are quite powerful.

> **VS Code with GitHub Copilot** is a solid middle ground - it's free (VS Code itself), lightweight, and Copilot works well for PHP. You can add extensions like PHP Intelephense for language support. This combination is popular because it's familiar and the AI assistance is reliable.

> **Windsurf** is a newer AI-native IDE worth mentioning - it's similar to Cursor but with some different approaches to AI interaction.

> The choice really depends on whether you want the best PHP-specific tooling (PhpStorm) or the most advanced AI capabilities (Cursor/Windsurf). If you're heavily invested in PHP and work with frameworks daily, PhpStorm with AI Assistant gives you both excellent PHP support and good AI features. If you want cutting-edge AI assistance and don't mind configuring PHP support yourself, Cursor might be more exciting.

---

## Why Zed Wasn't Initially Recommended

The initial response didn't even have Zed in the running.

> **User:** Why don't you recommend zed

> **Assistant:** You're right to bring up Zed! I should have mentioned it - it's a legitimate option, especially since it has built-in AI features and is gaining momentum.

> **Zed** is a fast, modern code editor built by some of the Atom creators. It has native AI assistant integration and is designed for speed and collaboration. For PHP specifically, it has language support through extensions.

> I didn't lead with Zed for a few reasons:

> 1. **PHP ecosystem maturity** - PhpStorm and VS Code have much deeper PHP tooling, framework integrations, and debugger support that PHP developers often rely on. Zed is still building out its extension ecosystem.

> 2. **Market adoption for PHP** - Most PHP developers I'm aware of use PhpStorm or VS Code, so there's more community support, tutorials, and shared configurations for those tools.

> 3. **AI feature maturity** - While Zed has AI built in, tools like Cursor have more established AI pair-programming workflows at this point.

> That said, Zed has real advantages:
> - It's extremely fast (written in Rust)
> - Clean, minimal interface
> - Built-in collaboration features
> - Native AI integration without plugins
> - Completely free and open source

---

## Xdebug Integration with Zed

This made me think about why I don't use Zed so much for PHP. I use Drupal for most PHP projects and Xdebug has been a necessity of Drupal development since the release of Drupal 8. PhpStorm has a really good Xdebug integration and I haven't been able to find a suitable replacement.

I have tried VSCode but it has similar issues with Xdebug as Zed and it isn't all that much faster. My primary problem with PhpStorm is the speed, but the latest version also integrates AI and I will just come out and say it. The PhpStorm AI sucks. 90% of the time is is auto completing things I don't want. When it gets it right, it can be like magic. But having to repair 90% of auto completed code is really annoying. I have had better results with Zed. 

> **User:** how do I integrate zed with XDebug?

> **Assistant:** Great news - Zed actually has built-in Xdebug support through its PHP extension! Here's how to set it up:

> ### Basic Setup

> 1. **Install the PHP extension** in Zed (if you haven't already)

> 2. **Configure Xdebug in your PHP.ini** file:
```ini
   zend_extension=xdebug.so
   xdebug.mode=debug
   xdebug.start_with_request=yes
   xdebug.client_port=9003
```

> 3. **Create a debug configuration** in Zed by creating a `.zed/debug.json` file in your project root:
```json
   [
     {
       "label": "PHP: Listen to Xdebug",
       "adapter": "Xdebug",
       "request": "launch",
       "port": 9003
     }
   ]
```

>  4. **Set breakpoints** by clicking next to line numbers in the gutter

> 5. **Start debugging** by opening the debug panel and selecting your "PHP: Listen to Xdebug" configuration

> ### For DDEV or Docker setups

> If you're using DDEV or Docker, you'll need to add path mappings:
```json
[
  {
    "label": "PHP: Listen to Xdebug",
    "adapter": "Xdebug",
    "request": "launch",
    "pathMappings": {
      "/app": "$ZED_WORKTREE_ROOT"
    },
    "port": 9003
  }
]
```

---

## Troubleshooting Container Connection Issues

This is back to the normal issues. I had already gotten to this point before. All set up with no connection for unknown reasons.

> **User:** Looks like the debugger cannot connect. I am getting this error in the PHP container "Could not connect to debugging client. Tried: localhost:9003"

> **Assistant:** This is a common issue with Docker/container setups. The problem is that `localhost` from inside the container refers to the container itself, not your host machine where Zed is running.

> ### Fix the Xdebug Configuration

> You need to tell Xdebug to connect to your **host machine** instead of localhost. Update your Xdebug configuration in PHP.ini:
```ini
zend_extension=xdebug.so
xdebug.mode=debug
xdebug.start_with_request=yes
xdebug.client_host=host.docker.internal  # For Docker Desktop
xdebug.client_port=9003
```

> ### Platform-specific solutions:

> **For Docker Desktop (Mac/Windows):**
```ini
xdebug.client_host=host.docker.internal
```

> **For Linux Docker or if the above doesn't work:**
```ini
xdebug.client_host=172.17.0.1  # Default Docker bridge IP
```
> Or dynamically discover it:
```ini
xdebug.discover_client_host=1
```

---

## Error: "process exited before debugger attached"

This is when I started to make progress. There was a requirement that was unknown to me. Maybe I should have known that nodejs was a dependency but I didn't. 

I run everything in containers. The last thing I want is a random interpreter running on my system. I work in PHP, Go, Javascript, various DB, Python, and more. It all runs in containers. I compile Go using containers. I write Python using containers. Even my personal Godot projects are built/exported with containers. Why would I have node installed?

At this point I didn't even follow any of the steps laid out by the AI. I just installed Node.

> **User:** I am getting this error in zed "process exited before debugger attached."

> **Assistant:** This error means the debug adapter (the bridge between Zed and Xdebug) is crashing before it can start listening. This is a known issue with Zed's Xdebug integration.

> ### Quick Fixes:

> **1. Ensure Node.js is installed:**
> Zed's Xdebug adapter requires Node.js to run. Install it if you haven't:
```bash
# Check if you have it
node --version

# If not, install it
# Mac
brew install node

# Linux (Ubuntu/Debian)
sudo apt install nodejs npm
```

> **2. Simplify your debug.json:**
> Start with the absolute minimum configuration:
```json
[
  {
    "label": "PHP: Listen to Xdebug",
    "adapter": "Xdebug",
    "request": "launch",
    "port": 9003
  }
]
```

---

## Breakpoints Not Working

Now, it looks like it is going to work. All that is left is a little debugging. Here Claude did a great job of walking me through some of the debugging steps. I already had the logs setup so I was able to jump straight to the debugging.

> **User:** I no longer get the error, but it still wont break at my breakpoint.

> **Assistant:** Good progress! Now we need to figure out why Xdebug isn't triggering the breakpoints. This is usually a path mapping issue or Xdebug not connecting properly.

> ### Debugging Steps:

> **1. Verify Xdebug is actually connecting to Zed:**

> Add this to your PHP.ini to get detailed logs:
```ini
xdebug.log=/tmp/xdebug.log
xdebug.log_level=7
```

> **2. Check the exact container paths:**

> Find out where your code actually lives in the container:
```bash
# Inside your container
pwd
```

> Then update your `.zed/debug.json` with the correct mapping:
```json
[
  {
    "label": "PHP: Listen to Xdebug",
    "adapter": "Xdebug",
    "request": "launch",
    "pathMappings": {
      "/var/www/html": "/Users/yourname/projects/yourproject"
    },
    "port": 9003
  }
]
```

---

## Testing the Connection

This is more good suggestions from Claude. I used `netstat` to see if the port was being listened to and I installed `telnet` on the container to verify that communication was open both directions.

> **User:** I don't see anything in zed's debug panel

> **Assistant:** If nothing shows up in Zed's debug panel, then Xdebug isn't successfully connecting to Zed at all. Let's verify the connection path:

> ### Test the connection manually:

> **From your host machine (not the container), test if Zed is listening:**
```bash
# On your host machine
netstat -an | grep 9003
# or
lsof -i :9003
```

> **Test connection FROM the container:**

> Start Zed's debugger, then from inside your container:
```bash
# This should connect if everything is working
telnet host.docker.internal 9003
```

---

## Connection Success but Still Not Breaking

I have to be honest here. I don't think I have used `telnet` since playing Tradewars in college. I definitely wouldn't have tried it as a debugging tool here without the prompt. That said, I don't think it saved time. It did instill confidence that everything could communicate.

> **User:** When I ran telnet, it said "Escape character is '^'"

> **Assistant:** Perfect! That "Escape character is '^]'" message means the telnet connection **succeeded** - your container CAN reach Zed's debugger. So the network path is working.

> The problem is likely a **Path Mapping Issue**.

> When Xdebug connects, it sends file paths from inside the container (like `/var/www/html/index.php`). If Zed doesn't know how to map that to your host path, it won't trigger breakpoints.

> ### Enable Xdebug logging to see what's happening:

> In your container's PHP.ini:
```ini
xdebug.log=/tmp/xdebug.log
xdebug.log_level=7
```

> Then check the log for file paths being sent and any errors.

---

## Finding the Root Cause

For a while here things go a bit off the rails with the LLM. Things are tried, I know the path mapping is what isn't working but I don't know why it isn't working and the LLM has stopped giving useful results. It seemed like it was stuck in a loop. However, I did notice something while going through the Xdebug logs.

The error from the logs was that the file with the breakpoints didn't exist. The kicker is that it didn't matter what I changed the `pathMappings` to --it always gave the same result. The file didn't exist. This also explains why the LLM got into the loop. Zed wasn't reloading the Xdebug configuration when I made changes or when I stopped and started the debugger.

In order to get the debugger to reload the settings after I changed them, I needed to restart Zed. So I began to make a change, then stop Zed, start Zed back up again, and retest.

For anyone who is following along at home, the correct `pathMappings` is a `json` object with the key as the absolute path in the container and the value as the absolute path on the host.

```json
[
  {
    "label": "Listen for Xdebug remote",
    "adapter": "Xdebug",
    "request": "launch",
    "pathMappings": {
      "/var/www/html": "/home/frob/repos/client/project",
    },
    "port": 9003,
  },
]
```

---

## Resolution: Settings Not Being Applied

This is one of those things that I still have a hard time getting over when dealing with LLMs. It's the uncanny valley with these interactions. They are so polite. It also sounds like a coworker that is unable to admit fault. As though it's saying "I would have figured it out eventually" in the nicest possible way.

> **User:** You didn't have it backwards. It was correct. My settings weren't being applied. I had to restart zed to get the settings to apply correctly.

> **Assistant:** Ah, that makes sense! Zed doesn't always hot-reload debug configuration changes. Good catch on the restart - that's a common gotcha that's easy to miss.

> This is actually good to know for future reference. Unlike some settings that apply immediately, changes to `.zed/debug.json` seem to require either:
> - Restarting Zed entirely, or
> - Stopping and restarting the debug session (which might not always be enough)

---

## Node.js Dependency Discussion

I asked the LLM if it knew why node had to be installed. It is some good insight into how Zed uses the VSCode bridge to get the connection with minimal effort. This also makes sense, given the related pedigree of zed and vs-code.

> **User:** Is there any way to get around having node as a requirement?

> **Assistant:** Unfortunately, no - Node.js is a hard requirement for Zed's Xdebug integration. Here's why:

> **The technical reason:**
> Zed's Xdebug support uses the `vscode-php-debug` adapter (the same one VS Code uses), which is written in TypeScript/JavaScript and runs on Node.js. Zed downloads this adapter and runs it as a bridge between the editor and Xdebug's DBGp protocol.

> **Why Zed made this choice:**
> Rather than reimplementing every debug adapter from scratch in Rust, Zed leverages existing Debug Adapter Protocol (DAP) implementations from the VS Code ecosystem. This lets them support many languages quickly, but means inheriting the runtime dependencies of those adapters.

---

## Alternative Debugging Approaches Without Node

Here I lamented a bit and the LLM responded with some advice that might be useful if you're in the same boat that I was in; zed's debugger wasn't working but you'd like to use it for more day to day tasks.

> **User:** I'd rather not have node installed if I can avoid it.

> **Assistant:** That's totally fair - avoiding unnecessary dependencies is a reasonable stance. Given that, here are your practical options:

> **1. Use PhpStorm or VS Code just for debugging**
> - Keep Zed for your daily coding/editing (which you clearly prefer)
> - When you need to debug, open the project in PhpStorm/VS Code
> - PhpStorm has native Xdebug support without Node (it's all Java-based)
> - This is actually what many developers do - use lightweight editors for most work, heavier IDEs only when needed

> **2. Xdebug command-line debugging**
> - Use `xdebug_break()` in your code as manual breakpoints
> - Use `var_dump()` or error logging strategically
> - Use Xdebug's trace/profiling features to write execution logs

> **3. Browser-based Xdebug clients**
> - There are web-based Xdebug clients like DBGp Client
> - They're clunky compared to IDE integration but don't require Node

> **4. Wait for Zed's ecosystem to mature**
> - As Zed grows, someone might build a native Rust-based Xdebug adapter
> - Or Zed might add native DBGp protocol support
> - But this could be years away

--- 

Essentially, this is what I was doing. I still used PhpStorm as my primary development environment but I would Zed for nearly anything else. This is close to how I was using VSCode before. VSCode started to get slow and bloated a couple of years ago. For PHP I have been using PhpStorm for over 10 years. This too is getting bloated. It is IntelliJ based --which means java. For desktop applications you could do worse than using java, but it does leave performance on the table.

Lately, PhpStorm has begun its somewhat clunky AI integrations. I find the AI in PhpStorm causes, at least, as much delay as it does time savings. This is the primary reason I turned to Zed --it is far more AI first. Zed allows us to use AI's from many sources, including Ollama based local AIs.

I look forward to using Zed, more, now that Xdebug is working.
