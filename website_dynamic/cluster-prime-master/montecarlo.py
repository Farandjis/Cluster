import sys
from mpi4py import MPI
import random
import time
import json

def compute_monte_carlo(total_throws):
    count_inside = 0
    for _ in range(total_throws):
        x, y = random.random(), random.random()
        if x * x + y * y <= 1.0:
            count_inside += 1
    return count_inside

def master(total_count, num_workers):
    comm = MPI.COMM_WORLD
    results = []
    start_time = time.time()

    # For single process case, do the calculation directly
    if num_workers == 0:
        total = compute_monte_carlo(total_count)
        pi_estimate = 4.0 * total / total_count
    else:
        # Multiple processes case
        for i in range(1, num_workers + 1):
            comm.send(total_count, dest=i, tag=0)
        for i in range(1, num_workers + 1):
            result = comm.recv(source=i, tag=1)
            results.append(result)
        total = sum(results)
        pi_estimate = 4.0 * total / (total_count * num_workers)
    elapsed_time = time.time() - start_time

    error = abs(pi_estimate - 3.141592653589793) / 3.141592653589793
    
    data = {
        "parameters" : {"total_count" : total_count, "nodes" : num_workers + 1},
        "message": "Monte Carlo estimation of Pi:",
        "nb_it": total_count * (num_workers + 1),
        "nodes": num_workers + 1,
        "time_elapsed": elapsed_time,
        "error": error,
        "approx_pi": pi_estimate
    }
    # Convertissez le dictionnaire en chaîne JSON
    json_output = json.dumps(data)

    comm.Barrier()
    if comm.Get_rank() == 0:
        print(json_output)

def worker():
    comm = MPI.COMM_WORLD
    total_count = comm.recv(source=0, tag=0)
    total_inside = compute_monte_carlo(total_count)
    comm.send(total_inside, dest=0, tag=1)

    comm.Barrier()

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python votre_script.py <total_count>")
        sys.exit(1)

    try:
        total_count = int(sys.argv[1])
    except ValueError:
        print("Veuillez fournir un nombre valide pour total_count.")
        sys.exit(1)

    comm = MPI.COMM_WORLD
    rank = comm.Get_rank()
    size = comm.Get_size()

    if rank == 0:
        master(total_count, size - 1)
    else:
        worker()
