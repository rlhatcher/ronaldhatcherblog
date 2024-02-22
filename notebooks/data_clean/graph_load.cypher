LOAD CSV WITH HEADERS FROM 'file:///manufacturers.csv' AS line
CREATE (:Manufacturer {name: line.name, mfgID: line.mfgID})

LOAD CSV WITH HEADERS FROM 'file:///motors.csv' AS line
CREATE (:Motor {
  commonName: line.commonName,
  delays: line.delays,
  diameter: toFloat(line.diameter),
  infoUrl: line.infoUrl,
  totImpulseNs: toFloat(line.totImpulseNs),
  manufacturer: line.manufacturer,
  burnTimeS: toFloat(line.burnTimeS),
  propInfo: line.propInfo,
  length: toFloat(line.length),
  avgThrustN: toFloat(line.avgThrustN),
  dataFiles: line.dataFiles,
  impulseClass: line.impulseClass,
  sparky: line.sparky,
  caseInfo: line.caseInfo,
  propWeightG: toFloat(line.propWeightG),
  certOrg: line.certOrg,
  motorId: line.motorId,
  availability: line.availability,
  maxThrustN: toFloat(line.maxThrustN),
  totalWeightG: toFloat(line.totalWeightG),
  designation: line.designation,
  updatedOn: line.updatedOn,
  type: line.type,
  mfgID: line.mfgID
})