import Service from '../components/Service'

const Services = () => {
  return (
    <div>
      <div className='bg-white'>
        <h2 className='flex justify-center font-bold text-3xl
        font-serif pt-9 text-blue-900 hover:text-cyan-950 '>Our Services</h2>
        <div className='flex flex-wrap mt-10 justify-center'>
          <Service title={"Storage of previous rent"} description={"The system securely stores historical rent data, allowing users to access and analyze trends over time."}/>
          <Service title={"Data retrieval"} description={' Users can easily retrieve specific rent data from the system, enabling quick access to relevant information.'}/>
          <Service title={"Customizable parameters"} description={' Users can customize parameters for data collection and analysis based on their specific needs and preferences.'}/>
          <Service title={"Security measures"} description={'The system implements robust security measures to protect sensitive rent data, including encryption, access controls, and regular backups.'}/>
          <Service title={"Scalability"} description={'The system is designed to handle large volumes of rent data and can scale up to accommodate growing needs and demands.'}/>
          <Service title={"Support and maintenance"} description={'The system offers ongoing support and maintenance services to address any issues or concerns users may encounter.'}/>
        </div>
      </div>
    </div>
  )
}

export default Services
