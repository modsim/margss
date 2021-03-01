import os
import h5py
import arviz.stats.diagnostics as diagnostics
import argparse
import numpy as np


def run(args):
    sample_files = [
        os.path.join(args.input_path, 'chain_0_samples.hdf5'),
        os.path.join(args.input_path, 'chain_1_samples.hdf5'),
    ]

    chains = []
    for sf in sample_files:
        file = h5py.File(sf, 'r')
        chains.append(np.array(file['states'][:]))
        file.close()
    # chain1 = pd.read_hdf(sample_files[0], 'states') #.to_numpy()
    # chain2 = pd.read_hdf(sample_files[1], 'states') #.to_numpy()
    print(chains[0].shape)

    rhat = []
    for n in range(chains[0].shape[1]):
        sample_stack = [m[:,n] for m in chains]
        all_samples = np.vstack(tuple(sample_stack))
        rhat.append(diagnostics.rhat(all_samples))

    os.path.join(args.input_path, 'chain_1_samples.hdf5'),
    print('psrf: ' + str(min(rhat)))
    output = np.array([min(rhat)])
    np.savetxt(os.path.join(args.input_path, "diagnostic_results"), output)


if __name__ == "__main__":
    parser = argparse.ArgumentParser("description=mcmc diagnostics (PSRF).")
    parser.add_argument('-i', '--input-path', help='path to dir containing .hdf5 samples')
    args = parser.parse_args()
    print(args)
    run(args)
