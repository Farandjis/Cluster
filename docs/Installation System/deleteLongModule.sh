#!/bin/bash

AGE_LIMIT=10800

ps -eo pid,lstart,cmd | grep "PPP" |  while read pid start_time cmd; do

    process_time="$start_time $cmd"
    process_timestamp=$(date -d "$process_time" +%s)
    current_timestamp=$(date +%s)
    process_age=$((current_timestamp - process_timestamp))

    if [ $process_age -gt $AGE_LIMIT ]; then
        echo "Killing process $pid (Age: $process_age seconds)"
        kill -9 $pid
    fi
done

