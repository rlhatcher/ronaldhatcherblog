import xml2js from 'xml2js'
import fs from 'fs/promises'

interface MotorDetail {
  manufacturer: string
  designation: string
  delay: string
  ignitionevent: string
  ignitiondelay: string
}

export async function processOrkFile (filePath: string): Promise<void> {
  try {
    const xmlData = await fs.readFile(filePath, 'utf8')
    console.log(xmlData)
    const result = await xml2js.parseStringPromise(xmlData)
    console.log(JSON.stringify(result, null, 4))
    const processedConfigurations = processJson(result)
    console.log(JSON.stringify(processedConfigurations, null, 4))
  } catch (error) {
    console.error('Error processing the XML file:', error)
  }
}

function processJson (data: any): ConfigurationDetail[] {
  const configurations: ConfigurationDetail[] = []
  const motorsByConfigId: Record<string, MotorDetail> = {}
  // Process motors
  data.openrocket.rocket[0].subcomponents[0].stage.forEach((stage: any) => {
    stage.subcomponents.forEach((subcomponent: any) => {
      subcomponent.motor?.forEach((motor: any) => {
        const configId = motor.$.configid
        motorsByConfigId[configId] = {
          manufacturer: motor.manufacturer[0],
          designation: motor.designation[0],
          delay: motor.delay[0],
          ignitionevent: '',
          ignitiondelay: ''
        }
      })
    })
  })

  // Process ignition configurations
  data.openrocket.rocket[0].subcomponents[0].stage.forEach((stage: any) => {
    stage.subcomponents.forEach((subcomponent: any) => {
      subcomponent.motormount?.forEach((mount: any) => {
        mount.ignitionconfiguration?.forEach((ignition: any) => {
          const configId = ignition.$.configid
          if (motorsByConfigId[configId] != null) {
            motorsByConfigId[configId].ignitionevent = ignition.ignitionevent[0]
            motorsByConfigId[configId].ignitiondelay = ignition.ignitiondelay[0]
          }
        })
      })
    })
  })

  // Process configurations and simulations with updated structure
  data.openrocket.rocket[0].motorconfiguration.forEach((config: any) => {
    const configId = config.$.configid
    const motorDetail = motorsByConfigId[configId]
    const stageInfo = config.stage[0].$

    const simulations: SimulationDetail[] = data.openrocket.simulations[0].simulation
      .filter((sim: any) => sim.conditions[0].configid.includes(configId))
      .map((sim: any) => {
        const flightData = sim.flightdata[0].$
        return {
          name: sim.name[0],
          simulator: sim.simulator[0],
          calculator: sim.calculator[0],
          // Directly map flight data attributes
          maxaltitude: flightData.maxaltitude,
          maxvelocity: flightData.maxvelocity,
          maxacceleration: flightData.maxacceleration,
          maxmach: flightData.maxmach,
          timetoapogee: flightData.timetoapogee,
          flighttime: flightData.flighttime,
          groundhitvelocity: flightData.groundhitvelocity,
          launchrodvelocity: flightData.launchrodvelocity,
          deploymentvelocity: flightData.deploymentvelocity,
          optimumdelay: flightData.optimumdelay
        }
      })

    configurations.push({
      configId,
      stageNumber: (stageInfo.number != null) ? parseInt(stageInfo.number) : undefined,
      stageActive: stageInfo.active === 'true',
      manufacturer: motorDetail.manufacturer,
      designation: motorDetail.designation,
      delay: motorDetail.delay,
      ignitionEvent: motorDetail.ignitionevent,
      ignitionDelay: motorDetail.ignitiondelay,
      simulations
    })
  })

  return configurations
}
