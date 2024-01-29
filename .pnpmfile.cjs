const DEPENDENCY_TYPES = ['dependencies', 'devDependencies', 'optionalDependencies', 'peerDependencies'];
const REMOVE_DEPENDENCIES = ['playwright', 'safaridriver', 'webdriverio'];

function readPackage(pkg, context) {
  if (process.env.NODE_ENV === 'production') {
    const searchResults = searchAllDependencies(pkg);
    if (searchResults.hasDep) {
      searchResults.results.forEach((pkgDeps, depType) => {
        pkgDeps.forEach(([depName, _]) => (pkg[depType] = removeDepFromPackage(pkg, depName, depType)));
      });
    }
  }
  return pkg;
}

function searchAllDependencies(pkg, depName) {
  const pkgDepTypeMap = {
    dependencies: pkg.dependencies,
    devDependencies: pkg.devDependencies,
    optionalDependencies: pkg.optionalDependencies,
    peerDependencies: pkg.peerDependencies,
  };

  let hasDep = false;
  const results = new Map();
  DEPENDENCY_TYPES.forEach((type) => {
    REMOVE_DEPENDENCIES.forEach((depName) => {
      const resultsForDepType = searchDependencies(depName, pkgDepTypeMap[type], type);
      if (resultsForDepType.length > 0) {
        hasDep = true;
        results.set(type, resultsForDepType);
      }
    });
  });

  return { name: pkg.name, depName, hasDep, results };
}

function searchDependencies(searchDep, dependencies, type) {
  return Object.keys(dependencies)
    .filter((name) => name.includes(searchDep))
    .map((name) => [name, type]);
}

function removeDepFromPackage(pkg, depName, depType) {
  const dependencies = JSON.parse(JSON.stringify(pkg[depType]));
  if (dependencies[depName]) {
    delete dependencies[depName];
  }
  return dependencies;
}

module.exports = {
  hooks: {
    readPackage,
  },
};
