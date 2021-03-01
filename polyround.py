import os.path
import sys
path = os.path.dirname(__file__)
sys.path.insert(0, path+'/PolyRound')
import argparse
from PolyRound import api
from PolyRound.mutable_classes.polytope import Polytope
from PolyRound.static_classes.lp_utils import ChebyshevFinder
import pandas as pd
import h5py


def run(args):
    print(args)
    polytope = None
    if os.path.splitext(args.input_file)[1] == '.xml':
        polytope = api.PolyRoundApi.sbml_to_polytope(args.input_file)
    elif os.path.splitext(args.input_file)[1] == '.hdf5' or os.path.splitext(args.input_file)[1] == '.h5':
        A = pd.read_hdf(args.input_file, 'A')
        b = pd.read_hdf(args.input_file, 'b')
        polytope = Polytope(A, b)
    else:
        print('Wrong file format. Use .xml, .hdf5 or .h5')
        exit(1)
    print(polytope.A)
    print(polytope.b)
    hp_flags = {"FeasibilityTol": args.feasibility_tolerance,
                "OptimalityTol": args.optimality_tolerance}
    backend = 'glpk'
    polytope = api.PolyRoundApi.simplify_polytope(polytope=polytope,
                                                  backend=backend,
                                                  hp_flags=hp_flags,
                                                  thresh=args.default_width)
    polytope = api.PolyRoundApi.transform_polytope(polytope=polytope,
                                                   backend=backend,
                                                   hp_flags=hp_flags)
    if args.round:
        polytope = api.PolyRoundApi.round_polytope(polytope=polytope,
                                                   hp_flags=hp_flags,
                                                   backend=backend)

    api.PolyRoundApi.polytope_to_hdf5(polytope, args.output_file)
    [chebyshev,dist] = ChebyshevFinder.chebyshev_center(polytope)

    h5 = h5py.File(args.output_file, 'w')
    h5.create_dataset('start', data=chebyshev)
    h5.create_dataset('A', data=polytope.A)
    h5.create_dataset('b', data=polytope.b)
    h5.create_dataset('transformation', data=polytope.transformation)
    h5.create_dataset('shift', data=polytope.shift)
    h5.close()


if __name__ == "__main__":
    parser = argparse.ArgumentParser("description=preprocess polytopes for HOPS.")
    parser.add_argument('-r', '--round', default=True, type=bool,
                        help="calculate apply rounding transformation")
    parser.add_argument('-i', '--input-file', help='input file, sbml (xml) or hdf5')
    parser.add_argument('-o', '--output-file', help='output file file (hdf5)')
    parser.add_argument('-ftol', '--feasibility-tolerance', default='1e-09', type=float,
                        help='Feasibility Tolerance for LP solver.')
    parser.add_argument('-otol', '--optimality-tolerance', default='1e-08', type=float,
                        help='Feasibility Tolerance for LP solver.')
    parser.add_argument('-w', '--default-width', default='1e-07', type=float,
                        help='Minimal width of dimensions')
    parser.add_argument('-m', '--max-scaling-per-rounding-iteration', default='1e6', type=float,
                        help='Upper bound on scaling for rounding algo. Higher values take less time but are numerically less stable.')
    parser.add_argument('-s', '--svd-threshold', default='1e-12', help='min threshold for svd.')

    args = parser.parse_args()
    run(args)
