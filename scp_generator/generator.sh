#!/usr/bin/env bash

python3 generate_scp.py
git add raw_scp/*
git commit -m "add"
git pull
git push