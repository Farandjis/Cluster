import os
from mpi4py import MPI
import time
import logging

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

def is_prime(n):
    if n <= 1:
        return False
    for i in range(2, int(n**0.5) + 1):
        if n % i == 0:
            return False
    return True

def compute_primes(start, end):
    count = 0
    for num in range(start, end):
        if is_prime(num):
            count += 1
    return count

def master(scalability_tests, output_file):
    comm = MPI.COMM_WORLD

    try:
        with open(output_file, 'w') as file:
            file.write('TotalPrimes, Ntot, AvailableProcessors, TimeDuration(ms)\n')

            for test in scalability_tests:
                total_count = test['range']
                num_workers = test['workers']
                range_per_worker = total_count // num_workers
                start_time = time.time()

                # Send work to each worker
                for i in range(1, num_workers + 1):
                    start = (i - 1) * range_per_worker
                    end = start + range_per_worker if i < num_workers else total_count
                    comm.send((start, end), dest=i, tag=0)

                # Collect results from each worker
                total_primes = sum(comm.recv(source=i, tag=1) for i in range(1, num_workers + 1))
                duration = time.time() - start_time

                # Write to CSV
                file.write(f'{total_primes}, {total_count}, {num_workers}, {duration * 1000}\n')
                logging.info(f'Written results for {num_workers} workers and range {total_count} to {output_file}')

    except Exception as e:
        logging.error(f'Failed to write to CSV file: {e}')

def worker():
    comm = MPI.COMM_WORLD
    while True:
        start, end = comm.recv(source=0, tag=0)
        total_primes = compute_primes(start, end)
        comm.send(total_primes, dest=0, tag=1)

if __name__ == "__main__":
    comm = MPI.COMM_WORLD
    rank = comm.Get_rank()

    # Define your scalability tests here
    scalability_tests_strong = [
        {'range': 10000, 'workers': 1},
        {'range': 10000, 'workers': 1},
        {'range': 10000, 'workers': 1},
        {'range': 10000, 'workers': 1},
        {'range': 10000, 'workers': 1},
        {'range': 10000, 'workers': 1},
        {'range': 10000, 'workers': 1},
        {'range': 10000, 'workers': 1},
        {'range': 10000, 'workers': 1},
        {'range': 10000, 'workers': 1},
        {'range': 10000, 'workers': 2},
        {'range': 10000, 'workers': 2},
        {'range': 10000, 'workers': 2},
        {'range': 10000, 'workers': 2},
        {'range': 10000, 'workers': 2},
        {'range': 10000, 'workers': 2},
        {'range': 10000, 'workers': 2},
        {'range': 10000, 'workers': 2},
        {'range': 10000, 'workers': 2},
        {'range': 10000, 'workers': 2},
        {'range': 10000, 'workers': 4},
        {'range': 10000, 'workers': 4},
        {'range': 10000, 'workers': 4},
        {'range': 10000, 'workers': 4},
        {'range': 10000, 'workers': 4},
        {'range': 10000, 'workers': 4},
        {'range': 10000, 'workers': 4},
        {'range': 10000, 'workers': 4},
        {'range': 10000, 'workers': 4},
        {'range': 10000, 'workers': 4},
        {'range': 100000, 'workers': 1},
        {'range': 100000, 'workers': 1},
        {'range': 100000, 'workers': 1},
        {'range': 100000, 'workers': 1},
        {'range': 100000, 'workers': 1},
        {'range': 100000, 'workers': 1},
        {'range': 100000, 'workers': 1},
        {'range': 100000, 'workers': 1},
        {'range': 100000, 'workers': 1},
        {'range': 100000, 'workers': 1},
        {'range': 100000, 'workers': 2},
        {'range': 100000, 'workers': 2},
        {'range': 100000, 'workers': 2},
        {'range': 100000, 'workers': 2},
        {'range': 100000, 'workers': 2},
        {'range': 100000, 'workers': 2},
        {'range': 100000, 'workers': 2},
        {'range': 100000, 'workers': 2},
        {'range': 100000, 'workers': 2},
        {'range': 100000, 'workers': 2},
        {'range': 100000, 'workers': 4},
        {'range': 100000, 'workers': 4},
        {'range': 100000, 'workers': 4},
        {'range': 100000, 'workers': 4},
        {'range': 100000, 'workers': 4},
        {'range': 100000, 'workers': 4},
        {'range': 100000, 'workers': 4},
        {'range': 100000, 'workers': 4},
        {'range': 100000, 'workers': 4},
        {'range': 100000, 'workers': 4},
        {'range': 1000000, 'workers': 1},
        {'range': 1000000, 'workers': 1},
        {'range': 1000000, 'workers': 1},
        {'range': 1000000, 'workers': 1},
        {'range': 1000000, 'workers': 1},
        {'range': 1000000, 'workers': 1},
        {'range': 1000000, 'workers': 1},
        {'range': 1000000, 'workers': 1},
        {'range': 1000000, 'workers': 1},
        {'range': 1000000, 'workers': 1},
        {'range': 1000000, 'workers': 2},
        {'range': 1000000, 'workers': 2},
        {'range': 1000000, 'workers': 2},
        {'range': 1000000, 'workers': 2},
        {'range': 1000000, 'workers': 2},
        {'range': 1000000, 'workers': 2},
        {'range': 1000000, 'workers': 2},
        {'range': 1000000, 'workers': 2},
        {'range': 1000000, 'workers': 2},
        {'range': 1000000, 'workers': 2},
        {'range': 1000000, 'workers': 4},
        {'range': 1000000, 'workers': 4},
        {'range': 1000000, 'workers': 4},
        {'range': 1000000, 'workers': 4},
        {'range': 1000000, 'workers': 4},
        {'range': 1000000, 'workers': 4},
        {'range': 1000000, 'workers': 4},
        {'range': 1000000, 'workers': 4},
        {'range': 1000000, 'workers': 4},
        {'range': 1000000, 'workers': 4}
    ]
    scalability_tests_weak = [
        {'range': 10000, 'workers': 1},
        {'range': 10000, 'workers': 1},
        {'range': 10000, 'workers': 1},
        {'range': 10000, 'workers': 1},
        {'range': 10000, 'workers': 1},
        {'range': 10000, 'workers': 1},
        {'range': 10000, 'workers': 1},
        {'range': 10000, 'workers': 1},
        {'range': 10000, 'workers': 1},
        {'range': 10000, 'workers': 1},
        {'range': 20000, 'workers': 2},
        {'range': 20000, 'workers': 2},
        {'range': 20000, 'workers': 2},
        {'range': 20000, 'workers': 2},
        {'range': 20000, 'workers': 2},
        {'range': 20000, 'workers': 2},
        {'range': 20000, 'workers': 2},
        {'range': 20000, 'workers': 2},
        {'range': 20000, 'workers': 2},
        {'range': 20000, 'workers': 2},
        {'range': 40000, 'workers': 4},
        {'range': 40000, 'workers': 4},
        {'range': 40000, 'workers': 4},
        {'range': 40000, 'workers': 4},
        {'range': 40000, 'workers': 4},
        {'range': 40000, 'workers': 4},
        {'range': 40000, 'workers': 4},
        {'range': 40000, 'workers': 4},
        {'range': 40000, 'workers': 4},
        {'range': 40000, 'workers': 4},
        {'range': 100000, 'workers': 1},
        {'range': 100000, 'workers': 1},
        {'range': 100000, 'workers': 1},
        {'range': 100000, 'workers': 1},
        {'range': 100000, 'workers': 1},
        {'range': 100000, 'workers': 1},
        {'range': 100000, 'workers': 1},
        {'range': 100000, 'workers': 1},
        {'range': 100000, 'workers': 1},
        {'range': 100000, 'workers': 1},
        {'range': 200000, 'workers': 2},
        {'range': 200000, 'workers': 2},
        {'range': 200000, 'workers': 2},
        {'range': 200000, 'workers': 2},
        {'range': 200000, 'workers': 2},
        {'range': 200000, 'workers': 2},
        {'range': 200000, 'workers': 2},
        {'range': 200000, 'workers': 2},
        {'range': 200000, 'workers': 2},
        {'range': 200000, 'workers': 2},
        {'range': 400000, 'workers': 4},
        {'range': 400000, 'workers': 4},
        {'range': 400000, 'workers': 4},
        {'range': 400000, 'workers': 4},
        {'range': 400000, 'workers': 4},
        {'range': 400000, 'workers': 4},
        {'range': 400000, 'workers': 4},
        {'range': 400000, 'workers': 4},
        {'range': 400000, 'workers': 4},
        {'range': 400000, 'workers': 4},
        {'range': 1000000, 'workers': 1},
        {'range': 1000000, 'workers': 1},
        {'range': 1000000, 'workers': 1},
        {'range': 1000000, 'workers': 1},
        {'range': 1000000, 'workers': 1},
        {'range': 1000000, 'workers': 1},
        {'range': 1000000, 'workers': 1},
        {'range': 1000000, 'workers': 1},
        {'range': 1000000, 'workers': 1},
        {'range': 1000000, 'workers': 1},
        {'range': 2000000, 'workers': 2},
        {'range': 2000000, 'workers': 2},
        {'range': 2000000, 'workers': 2},
        {'range': 2000000, 'workers': 2},
        {'range': 2000000, 'workers': 2},
        {'range': 2000000, 'workers': 2},
        {'range': 2000000, 'workers': 2},
        {'range': 2000000, 'workers': 2},
        {'range': 2000000, 'workers': 2},
        {'range': 2000000, 'workers': 2},
        {'range': 4000000, 'workers': 4},
        {'range': 4000000, 'workers': 4},
        {'range': 4000000, 'workers': 4},
        {'range': 4000000, 'workers': 4},
        {'range': 4000000, 'workers': 4},
        {'range': 4000000, 'workers': 4},
        {'range': 4000000, 'workers': 4},
        {'range': 4000000, 'workers': 4},
        {'range': 4000000, 'workers': 4},
        {'range': 4000000, 'workers': 4}
    ]

    output_dir = '/home/moi/output'
    output_file = os.path.join(output_dir, 'prime_scalability_results_strong.csv')
    output_file2 = os.path.join(output_dir, 'prime_scalability_results_weak.csv')

    if rank == 0:
        logging.info("I am the master, coordinating the work.")
        master(scalability_tests_strong, output_file)
        master(scalability_tests_weak, output_file2)
    else:
        logging.info(f"I am worker {rank}, performing computations.")
        worker()