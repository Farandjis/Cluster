from mpi4py import MPI
import socket
import json
import sys

def main():
    comm = MPI.COMM_WORLD
    rank = comm.Get_rank()
    size = comm.Get_size()
   
    # Get text from command line argument
    input_text = ' '.join(sys.argv[1:])
   
    # Split text into equal parts
    text_length = len(input_text)
    chunk_size = text_length // size
   
    if rank == 0:
        # Process rank 0's portion
        start_idx = rank * chunk_size
        end_idx = start_idx + chunk_size
        worker_text = input_text[start_idx:end_idx]

        all_results = [{
            "class_number": rank,
            "part_text": worker_text
        }]
        
        # Collect results from other ranks
        for i in range(1, size):
            data = comm.recv(source=i)
            all_results.append(data)
           
        # Sort by class number
        all_results.sort(key=lambda x: x['class_number'])
       
        final_text = "".join([result['part_text'] for result in all_results])
        result = {
            "parameters" : {"text" : input_text, "nodes" : size},
            "message": "Distributed Text Processing Complete",
            "nodes": size,
            "full_text": all_results
        }
        print(json.dumps(result))
       
    else:
        start_idx = rank * chunk_size
        end_idx = start_idx + chunk_size if rank < size - 1 else text_length
        worker_text = input_text[start_idx:end_idx]
       
        result = {
            "class_number": rank,
            "part_text": worker_text
        }
       
        comm.send(result, dest=0)

if __name__ == "__main__":
    main()
