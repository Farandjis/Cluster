import os
from mpi4py import MPI
import time
import logging

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

def sieve_of_eratosthenes(n):
    is_prime = [True] * (n + 1)
    p = 2
    while p * p <= n:
        if is_prime[p]:
            for i in range(p * p, n + 1, p):
                is_prime[i] = False
        p += 1
    return [p for p in range(2, n + 1) if is_prime[p]]

def compute_primes(start, end):
    primes = sieve_of_eratosthenes(end)
    return len([p for p in primes if p >= start])

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
        {'range': 10000000, 'workers': 1},
        {'range': 10000000, 'workers': 1},
        {'range': 10000000, 'workers': 1},
        {'range': 10000000, 'workers': 1},
        {'range': 10000000, 'workers': 1},
        {'range': 10000000, 'workers': 1},
        {'range': 10000000, 'workers': 1},
        {'range': 10000000, 'workers': 1},
        {'range': 10000000, 'workers': 1},
        {'range': 10000000, 'workers': 1},
        {'range': 10000000, 'workers': 2},
        {'range': 10000000, 'workers': 2},
        {'range': 10000000, 'workers': 2},
        {'range': 10000000, 'workers': 2},
        {'range': 10000000, 'workers': 2},
        {'range': 10000000, 'workers': 2},
        {'range': 10000000, 'workers': 2},
        {'range': 10000000, 'workers': 2},
        {'range': 10000000, 'workers': 2},
        {'range': 10000000, 'workers': 2},
        {'range': 10000000, 'workers': 4},
        {'range': 10000000, 'workers': 4},
        {'range': 10000000, 'workers': 4},
        {'range': 10000000, 'workers': 4},
        {'range': 10000000, 'workers': 4},
        {'range': 10000000, 'workers': 4},
        {'range': 10000000, 'workers': 4},
        {'range': 10000000, 'workers': 4},
        {'range': 10000000, 'workers': 4},
        {'range': 10000000, 'workers': 4}
    ]
    scalability_tests_weak = [
        {'range': 10000000, 'workers': 1},
        {'range': 10000000, 'workers': 1},
        {'range': 10000000, 'workers': 1},
        {'range': 10000000, 'workers': 1},
        {'range': 10000000, 'workers': 1},
        {'range': 10000000, 'workers': 1},
        {'range': 10000000, 'workers': 1},
        {'range': 10000000, 'workers': 1},
        {'range': 10000000, 'workers': 1},
        {'range': 10000000, 'workers': 1},
        {'range': 20000000, 'workers': 2},
        {'range': 20000000, 'workers': 2},
        {'range': 20000000, 'workers': 2},
        {'range': 20000000, 'workers': 2},
        {'range': 20000000, 'workers': 2},
        {'range': 20000000, 'workers': 2},
        {'range': 20000000, 'workers': 2},
        {'range': 20000000, 'workers': 2},
        {'range': 20000000, 'workers': 2},
        {'range': 20000000, 'workers': 2},
        {'range': 40000000, 'workers': 4},
        {'range': 40000000, 'workers': 4},
        {'range': 40000000, 'workers': 4},
        {'range': 40000000, 'workers': 4},
        {'range': 40000000, 'workers': 4},
        {'range': 40000000, 'workers': 4},
        {'range': 40000000, 'workers': 4},
        {'range': 40000000, 'workers': 4},
        {'range': 40000000, 'workers': 4},
        {'range': 40000000, 'workers': 4}
    ]
    output_dir = '/home/moi/output'
    output_file_strong = os.path.join(output_dir, 'strong_scalability_results_eratosthene.csv')
    output_file_weak = os.path.join(output_dir, 'weak_scalability_results_eratosthene.csv')

    if rank == 0:
        logging.info("I am the master, coordinating the work.")
        master(scalability_tests_strong, output_file_strong)
        master(scalability_tests_weak, output_file_weak)
    else:
        logging.info(f"I am worker {rank}, performing computations.")
        worker()